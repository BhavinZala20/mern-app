const express = require('express');

const { createProductController, shopProductController, deleteShopProduct, getAllProduct, productReview, getAdminAllProducts, updateProductController } = require("../Controller/ProductController");

const { isSeller, isAuthenticated, isAdmin } = require("../Middleware/authMiddleware.js");
const { upload } = require("../multer.js");

const router = express.Router();

// Create product
router.post("/create-product", upload.array('images'), createProductController);

// Get shop products
router.get("/get-all-shop-products/:id", shopProductController);

// Delete shop products
router.delete("/delete-shop-product/:id", isSeller, deleteShopProduct);

// Get all products
router.get("/get-all-products", getAllProduct);

// Product Review
router.put("/create-new-review", isAuthenticated, productReview);

// All products --- for admin
router.get("/admin-all-products", isAuthenticated, isAdmin("Admin"), getAdminAllProducts);

// Update Product
router.put("/update-product/:id", updateProductController);


module.exports = router; 