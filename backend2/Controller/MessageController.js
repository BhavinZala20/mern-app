const Messages = require("../Models/MessagesModel");
const ErrorHandler = require("../Utils/ErrorHandler");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const path = require("path");
const fs = require("fs");

// Create a new message
const createNewMessage = catchAsyncErrors(async (req, res, next) => {
  try {
    const messageData = req.body;

    if (req.file) {
      const filename = req.file.filename;
      const fileUrl = path.join(filename);
      messageData.images = fileUrl;
    }

    messageData.conversationId = req.body.conversationId;
    messageData.text = req.body.text;
    messageData.sender = req.body.sender;

    const message = new Messages({
      conversationId: messageData.conversationId,
      text: messageData.text,
      sender: messageData.sender,
      images: messageData.images ? messageData.images : undefined,
    });

    await message.save();

    res.status(201).json({
      success: true,
      message,
    });

  } catch (error) {
    return next(new ErrorHandler(error.message), 500);
  }
});

// Get all messages with conversation id
const getSellerConversation = catchAsyncErrors(async (req, res, next) => {
  try {
    const messages = await Messages.find({
      conversationId: req.params.id,
    });

    res.status(201).json({
      success: true,
      messages,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message), 500);
  }
});


module.exports = { createNewMessage, getSellerConversation };