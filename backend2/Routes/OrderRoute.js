const express = require('express');
const { createOrder, getUserOrder, getSellerAllOrder, updateOrderStatus, orderRefund, orderRefundSuccess, adminAllOrders } = require("../Controller/OrderController");
const { isSeller, isAuthenticated, isAdmin } = require("../Middleware/authMiddleware");

const router = express.Router();

// Create Order
router.post("/create-order", createOrder);

// Get User Order
router.get("/get-all-orders/:userId", getUserOrder);

// Get Seller Order
router.get("/get-seller-all-orders/:shopId", getSellerAllOrder);

// Update order status for seller
router.put("/update-order-status/:id", isSeller, updateOrderStatus);

// Order Refund
router.put("/order-refund/:id", orderRefund);

// Update order refund for seller
router.put("/order-refund-success/:id", isSeller, orderRefundSuccess);

// all orders --- for admin
router.get("/admin-all-orders", isAuthenticated, isAdmin("Admin"), adminAllOrders);


module.exports = router; 