const express = require('express');
const { createNewMessage, getSellerConversation } = require('../Controller/MessageController.js');
const { isAdmin, isAuthenticated, isSeller } = require("../Middleware/authMiddleware.js");
const { upload } = require("../multer.js");

const router = express.Router();

// Create a new conversation
router.post("/create-new-message", upload.single('images'), createNewMessage);

// Create a new conversation
router.get("/get-all-messages/:id", getSellerConversation);

module.exports = router;