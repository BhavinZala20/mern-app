const shopModel = require("../Models/ShopModel.js");
const eventModel = require("../Models/EventModel.js");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors.js");
const ErrorHandler = require("../Utils/ErrorHandler");
const fs = require("fs");

const createEventController = catchAsyncErrors(async (req, res, next) => {
  try {
    // console.log('Request body:', req.body);
    const shopId = req.body.shopId;
    const shop = await shopModel.findById(shopId);
    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid", 400));
    } else {
      const files = req.files;
      const imageUrls = files.map((file) => `${file.filename}`);
      const eventData = req.body;
      eventData.images = imageUrls;
      eventData.shop = shop;

      const event = await eventModel.create(eventData);

      res.status(201).json({
        success: true,
        event,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Get all events of a shop
const getAllShopEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await eventModel.find({ shopId: req.params.id });

    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Delete shop event
const deleteShopEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = req.params.id;

    const eventData = await eventModel.findById(productId);

    eventData.images.forEach((imageUrl) => {
      const filename = imageUrl;
      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
    const event = await eventModel.findByIdAndDelete(productId);

    if (!event) {
      return next(new ErrorHandler("Event is not found with this id", 404));
    }
    res.status(201).json({
      success: true,
      message: "Event Deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const getAllEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await eventModel.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// All events --- for admin
const getAllAdminEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await eventModel.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
module.exports = { createEventController, getAllShopEvent, deleteShopEvent, getAllEvent, getAllAdminEvent };