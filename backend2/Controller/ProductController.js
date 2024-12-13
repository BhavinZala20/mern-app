const productModel = require("../Models/ProductModel.js");
const orderModel = require("../Models/OrderModel");
const shopModel = require("../Models/ShopModel.js");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors.js");
const ErrorHandler = require("../Utils/ErrorHandler");
const fs = require("fs");

const createProductController = catchAsyncErrors(async (req, res, next) => {
  try {
    // console.log('Request body:', req.body);
    const shopId = req.body.shopId;
    const shop = await shopModel.findById(shopId);
    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid!", 400));
    } else {
      const files = req.files;
      const imageUrls = files.map((file) => `${file.filename}`);
      const productData = req.body;
      productData.images = imageUrls;
      productData.shop = shop;

      const product = await productModel.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Get all products of a shop
const shopProductController = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await productModel.find({ shopId: req.params.id });
    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Delete all products of a shop
const deleteShopProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = req.params.id;
    const productData = await productModel.findById(productId);

    productData.images.forEach((imageUrl) => {
      const filename = imageUrl;
      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });

    const product = await productModel.findByIdAndDelete(productId);

    if (!product) {
      return next(new ErrorHandler("Product is not found with this id", 404));
    }

    res.status(201).json({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// get all products
const getAllProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await productModel.find().sort({ createdAt: -1 });
    // const products = await productModel.find();

    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Product review 
const productReview = catchAsyncErrors(async (req, res, next) => {
  try {
    const { user, rating, comment, productId, orderId } = req.body;

    const product = await productModel.findById(productId);

    const review = {
      user,
      rating,
      comment,
      productId,
    };

    const isReviewed = product.reviews.find(
      (rev) => rev.user._id === req.user._id
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user._id === req.user._id) {
          (rev.rating = rating), (rev.comment = comment), (rev.user = user);
        }
      });
    } else {
      product.reviews.push(review);
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    await orderModel.findByIdAndUpdate(
      orderId,
      { $set: { "cart.$[elem].isReviewed": true } },
      { arrayFilters: [{ "elem._id": productId }], new: true }
    );

    res.status(200).json({
      success: true,
      message: "Review submitted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// All products --- for admin
const getAdminAllProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await productModel.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update Product Controller
const updateProductController = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = req.params.id;
    const shopId = req.body.shopId;

    // Find the product
    let product = await productModel.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found!", 404));
    }

    // Verify if the shopId matches
    // if (product.shopId !== shopId) {
    //   return next(new ErrorHandler("Unauthorized action!", 403));
    // }

    // Handle image updates if new images are uploaded
    // if (req.files && req.files.length > 0) {
    //   // Optionally, delete old images from the server
    //   // Example: fs.unlinkSync(`path_to_images/${imageName}`);

    //   const imageUrls = req.files.map((file) => `${file.filename}`);
    //   req.body.images = imageUrls;
    // }

    // Update the product
    product = await productModel.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      product,
      message: "Product updated successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = { createProductController, shopProductController, deleteShopProduct, getAllProduct, productReview, getAdminAllProducts, updateProductController };