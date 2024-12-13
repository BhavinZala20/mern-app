const orderModel = require("../Models/OrderModel");
const productModel = require("../Models/ProductModel.js");
const shopModel = require("../Models/ShopModel.js");
const ErrorHandler = require("../Utils/ErrorHandler.js");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors.js");
const { isAuthenticated } = require("../Middleware/authMiddleware.js");

const createOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

    // Group cart items by shopId
    const shopItemsMap = new Map();

    for (const item of cart) {
      const shopId = item.shopId;
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(item);
    }

    // Create an order for each shop
    const orders = [];

    for (const [shopId, items] of shopItemsMap) {
      const order = await orderModel.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });
      orders.push(order);
    }

    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getUserOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await orderModel.find({ "user._id": req.params.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get all orders of seller
const getSellerAllOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await orderModel.find({
      "cart.shopId": req.params.shopId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update order status for seller
const updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order could not be found", 400));
    }
    if (req.body.status === "Handed over to delivery service") {
      order.cart.forEach(async (o) => {
        await updateOrder(o._id, o.qty);
      });
    }

    order.status = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = "Succeeded";
      const serviceCharge = order.totalPrice * 0;
      await updateSellerInfo(order.totalPrice - serviceCharge);
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
    });

    async function updateOrder(id, qty) {
      const product = await productModel.findById(id);

      product.stock -= qty;
      product.sold_out += qty;

      await product.save({ validateBeforeSave: false });
    }

    async function updateSellerInfo(amount) {
      const seller = await shopModel.findById(req.seller.id);

      seller.availableBalance = amount;

      await seller.save();
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Give Refund
const orderRefund = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found", 400));
    }

    order.status = req.body.status;

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
      message: "Order Refund Request successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update order refund for seller
const orderRefundSuccess = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found", 400));
    }

    order.status = req.body.status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Refund successfull",
    });

    if (req.body.status === "Refund Success") {
      order.cart.forEach(async (o) => {
        await updateOrder(o._id, o.qty);
      });
    }

    async function updateOrder(id, qty) {
      const product = await productModel.findById(id);

      product.stock += qty;
      // Ensure that sold_out doesn't go below zero
      product.sold_out = Math.max(0, product.sold_out - qty);// product.sold_out -= qty;

      await product.save({ validateBeforeSave: false });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get all orders for admin
const adminAllOrders = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await orderModel.find().sort({
      deliveredAt: -1,
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = { createOrder, getUserOrder, getSellerAllOrder, updateOrderStatus, orderRefund, orderRefundSuccess, adminAllOrders };