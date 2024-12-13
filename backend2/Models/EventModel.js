const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter your product name"],
    },
    description: {
      type: String,
      required: [true, "Enter your product description"],
    },
    tags: {
      type: String,
    },
    originalPrice: {
      type: Number,
      required: [true, "Enter your product price"],
    },
    discountPrice: {
      type: Number,
      required: [true, "Enter your product discount price"],
    },
    category: {
      type: String,
      required: [true, "Enter your product category"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter your product stock!"],
    },
    start_Date: {
      type: Date,
      required: true,
    },
    Finish_Date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "Running",
    },
    images: [
      {
        type: String,
      },
    ],
    shopId: {
      type: String,
      required: true,
    },
    shop: {
      type: Object,
      required: true,
    },
    sold_out: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },

);

module.exports = mongoose.model('Event', eventSchema);
