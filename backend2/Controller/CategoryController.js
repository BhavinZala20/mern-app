const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const ErrorHandler = require("../Utils/ErrorHandler");
const categoryModel = require("../Models/CategoryModel");

const createCategoryController = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Category name is required" });
    }
    const category = new categoryModel({ name });
    await category.save();
    res.status(201).json({ category });
  } catch (error) {
    // res.status(500).send({
    //   success: false,
    //   errro,
    //   message: "Errro in Category",
    // });
    return next(new ErrorHandler(error, 400));
  }
});

// get all Categories
const getAllCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const category = await categoryModel.find();
    res.status(200).json({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const deleteCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Category ID is required" });
    }
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});


module.exports = { createCategoryController, getAllCategory, deleteCategory };