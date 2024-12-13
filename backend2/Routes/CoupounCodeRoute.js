const express = require('express');
const { createCoupounCode, getCoupounCode, deleteCoupounCode, CoupounCodeName } = require("../Controller/CoupounCodeController.js");
const { isSeller } = require('../Middleware/authMiddleware.js');


const router = express.Router();

// Create coupon code
router.post("/create-coupon-code", isSeller, createCoupounCode);

// Get coupon code
router.get("/get-coupon/:id", isSeller, getCoupounCode);

// Delete coupon code
router.delete("/delete-coupon/:id", isSeller, deleteCoupounCode);

// Get coupon code by name
router.get("/get-coupon-value/:name", CoupounCodeName);

module.exports = router; 