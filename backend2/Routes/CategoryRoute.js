const express = require('express');

const {
  getAllCategory, createCategoryController,
  deleteCategory
} = require("../Controller/CategoryController.js");

const { isAdmin, requireSignIn } = require("../Middleware/authMiddleware.js");

const router = express.Router();

router.post("/create-category", createCategoryController);

router.get("/get-all-category", getAllCategory);

router.delete("/delete-category/:id", deleteCategory);

module.exports = router; 
