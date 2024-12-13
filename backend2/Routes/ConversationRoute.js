const express = require('express');
const { createNewConversation, getSellerConversation, getUserConversation, updateLastMessage } = require('../Controller/ConversationController.js');
const { isAuthenticated, isSeller } = require("../Middleware/authMiddleware.js");

const router = express.Router();

// Create a new conversation
router.post("/create-new-conversation", createNewConversation);

// Get seller conversations
router.get("/get-all-conversation-seller/:id", isSeller, getSellerConversation);

// Get User conversations
router.get("/get-all-conversation-user/:id", isAuthenticated, getUserConversation);

// Update the last message
router.put("/update-last-message/:id", updateLastMessage);


module.exports = router; 