const JWT = require("jsonwebtoken");
const userModel = require("../Models/UserModel.js");
const ErrorHandler = require("../Utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors.js");
const ShopModel = require("../Models/ShopModel.js");

//Protected Routes token base
const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    // console.log(error);
  }
};

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = JWT.verify(token, process.env.JWT_SECRET);

  req.user = await userModel.findById(decoded.id);

  next();
});

const isSeller = catchAsyncErrors(async (req, res, next) => {
  const { shop_token } = req.cookies;
  if (!shop_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = JWT.verify(shop_token, process.env.JWT_SECRET);

  req.seller = await ShopModel.findById(decoded.id);

  next();
})

//admin acceess
const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`${req.user.role} can not access this resources!`));
    };
    next();
  };
};

module.exports = { requireSignIn, isAuthenticated, isAdmin, isSeller };