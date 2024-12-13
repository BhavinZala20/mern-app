const coupounCodeModel = require("../Models/CoupounCodeModel.js");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors.js");
const ErrorHandler = require("../Utils/ErrorHandler");

const createCoupounCode = catchAsyncErrors(async (req, res, next) => {
  try {
    const isCoupounCodeExists = await coupounCodeModel.find({
      name: req.body.name,
    });

    if (isCoupounCodeExists.length !== 0) {
      return next(new ErrorHandler("Coupoun code already exists!", 400));
    }

    const coupounCode = await coupounCodeModel.create(req.body);

    res.status(201).json({
      success: true,
      coupounCode,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Get all coupons of a shop
const getCoupounCode = catchAsyncErrors(async (req, res, next) => {
  try {
    const couponCodes = await coupounCodeModel.find({ shopId: req.seller.id });
    res.status(201).json({
      success: true,
      couponCodes,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
})

// Delete coupon of a shop
const deleteCoupounCode = catchAsyncErrors(async (req, res, next) => {
  try {
    const couponCode = await coupounCodeModel.findByIdAndDelete(req.params.id);

    if (!couponCode) {
      return next(new ErrorHandler("Coupon code dosen't exists!", 400));
    }
    res.status(201).json({
      success: true,
      message: "Coupon code deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }

})

// Get coupon code value by its name
const CoupounCodeName = catchAsyncErrors(async (req, res, next) => {
  try {
    const couponCode = await coupounCodeModel.findOne({ name: req.params.name });

    res.status(200).json({
      success: true,
      couponCode,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
})

module.exports = { createCoupounCode, getCoupounCode, deleteCoupounCode, CoupounCodeName };
