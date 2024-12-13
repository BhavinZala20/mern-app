const express = require('express');
const { createShop, activation, loginController, loadShop, logoutController, getShopInfo, updateShopPhoto, updateSellerInfo, adminAllSellers, adminDeleteSellers, getAllShop } = require('../Controller/ShopController');
const { upload } = require("../multer.js");
const { isAdmin, isAuthenticated, isSeller } = require("../Middleware/authMiddleware.js");

const router = express.Router();

//Create Shop
router.post("/shop-create", upload.single('file'), createShop);

//Activation
router.post("/activation", activation);

//Login
router.post("/shop-login", loginController);

// load User - Require authentication
router.get("/getSeller", isSeller, loadShop);

// Logout
router.get("/logout", isSeller, logoutController);

// Get ShopInfo
router.get("/get-shop-info/:id", getShopInfo);

// Update shop profile photo
router.put("/update-shop-avatar", isSeller, upload.single('image'), updateShopPhoto);

// Update seller info
router.put("/update-seller-info", isSeller, updateSellerInfo)

// all sellers --- for admin
router.get("/admin-all-sellers", isAuthenticated, isAdmin("Admin"), adminAllSellers);

// Delete seller for admin
router.delete("/delete-seller/:id", isAuthenticated, isAdmin("Admin"), adminDeleteSellers);

// Get All shops
router.get("/get-all-shops", getAllShop);

module.exports = router; 