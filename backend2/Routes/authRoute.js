const express = require('express');
const { registerController, activation, loginController, loadUser, logoutController, updateProfile, updateProfileAvatar, updateUserAddress, deleteUserAddress, updateUserPassword, userInfo, adminAllUsers, adminDeleteUsers, forgotPassword } = require('../Controller/authController.js');
const { upload } = require("../multer.js");
const { isAuthenticated, isAdmin } = require("../Middleware/authMiddleware.js");

const router = express.Router();

//REGISTER
router.post("/register", upload.single('file'), registerController);

//Activation
router.post("/activation", activation);

//LOGIN
router.post("/login", loginController);

// load User - Require authentication
router.get("/getuser", isAuthenticated, loadUser);

// Logout
router.get("/logout", isAuthenticated, logoutController);

// Update profile
router.put("/update-user-info", isAuthenticated, updateProfile);

// Update profile avatar
router.put("/update-avatar", isAuthenticated, upload.single('image'), updateProfileAvatar);

// Update user address
router.put("/update-user-addresses", isAuthenticated, updateUserAddress);

// Delete user address
router.delete("/delete-user-address/:id", isAuthenticated, deleteUserAddress);

// Update user password
router.put("/update-user-password", isAuthenticated, updateUserPassword);

// Find user infoormation with the userId
router.get("/user-info/:id", userInfo);

// Get all users for admin
router.get("/admin-all-users", isAuthenticated, isAdmin("Admin"), adminAllUsers);

// Delete user for admin
router.delete("/delete-user/:id", isAuthenticated, isAdmin("Admin"), adminDeleteUsers);

//Forgot Password
router.put("/forgot-password", forgotPassword);

module.exports = router; 