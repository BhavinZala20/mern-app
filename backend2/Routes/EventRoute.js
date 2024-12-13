const express = require('express');
const { createEventController, getAllShopEvent, deleteShopEvent, getAllEvent, getAllAdminEvent } = require("../Controller/EventController.js");
const { upload } = require("../multer.js");
const { isSeller, isAuthenticated, isAdmin } = require('../Middleware/authMiddleware.js');

const router = express.Router();

// Create product
router.post("/create-event", upload.array('images'), createEventController);

// Get all events of a shop
router.get("/get-all-shop-events/:id", getAllShopEvent);

// Delete shop event
router.delete("/delete-shop-event/:id", deleteShopEvent);

// Get all events 
router.get("/get-all-events", getAllEvent);

// Get All Admin events 
router.get("/admin-all-events", isAuthenticated, isAdmin("Admin"), getAllAdminEvent);

module.exports = router; 