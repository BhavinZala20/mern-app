const shopModel = require("../Models/ShopModel.js");
const JWT = require("jsonwebtoken");
const ErrorHandler = require("../Utils/ErrorHandler.js");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors.js");
const path = require("path");
const fs = require("fs");
const sendMail = require("../Utils/sendMail");
const sendShopToken = require("../Utils/shopToken.js");

const createShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const sellerEmail = await shopModel.findOne({ email });
    if (sellerEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" })
        }
      }
      );
      return next(new ErrorHandler("User already exists", 400));
    }

    const seller = {
      name: req.body.name,
      email: email,
      password: password,
      avatar: req.file.filename,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
    };

    const activationToken = createActivationToken(seller);

    const activationUrl = `http://localhost:5173/shop/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your Shop",
        message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${seller.email} to activate your shop!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const createActivationToken = (seller) => {
  return JWT.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Activate Shop
const activation = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    const newSeller = JWT.verify(
      activation_token,
      process.env.ACTIVATION_SECRET
    );

    if (!newSeller) {
      return next(new ErrorHandler("Invalid token", 400));
    }
    const { name, email, password, avatar, address, phoneNumber } =
      newSeller;

    let seller = await shopModel.findOne({ email });

    if (seller) {
      return next(new ErrorHandler("User already exists", 400));
    }

    seller = await shopModel.create({
      name,
      email,
      avatar,
      password,
      address,
      phoneNumber,
    });

    sendShopToken(seller, 201, res);
  } catch (error) {
    console.error("Token verification error: ", error.message);
    return next(new ErrorHandler(error.message, 500));
  }
})

//POST LOGIN
const loginController = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide the all fields!", 400));
    }

    const user = await shopModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Invalid credentials....!", 400)
      );
    }

    sendShopToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// load shop
const loadShop = catchAsyncErrors(async (req, res, next) => {
  try {
    // console.log(req.seller);
    const seller = await shopModel.findById(req.seller._id);

    if (!seller) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get LOGOUT
const logoutController = catchAsyncErrors(async (req, res, next) => {
  try {
    res.cookie("shop_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get shop info
const getShopInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const shop = await shopModel.findById(req.params.id);
    res.status(201).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update shop profile photo
const updateShopPhoto = catchAsyncErrors(async (req, res, next) => {
  try {

    const existsUser = await shopModel.findById(req.seller._id);

    const existAvatarPath = `uploads/${existsUser.avatar}`;

    fs.unlinkSync(existAvatarPath);

    const fileUrl = path.join(req.file.filename);

    const seller = await shopModel.findByIdAndUpdate(req.seller._id, { avatar: fileUrl });

    res.status(200).json({
      success: true,
      seller,
    });

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update seller info
const updateSellerInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, description, address, phoneNumber, zipCode } = req.body;

    const shop = await shopModel.findOne(req.seller._id);

    if (!shop) {
      return next(new ErrorHandler("User not found", 400));
    }

    shop.name = name;
    shop.description = description;
    shop.address = address;
    shop.phoneNumber = phoneNumber;
    shop.zipCode = zipCode;

    await shop.save();

    res.status(201).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get all sellers for admin
const adminAllSellers = catchAsyncErrors(async (req, res, next) => {
  try {
    const sellers = await shopModel.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      sellers,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Delete sellers for admin
const adminDeleteSellers = catchAsyncErrors(async (req, res, next) => {
  try {
    const seller = await shopModel.findById(req.params.id);

    if (!seller) {
      return next(
        new ErrorHandler("Seller is not available with this id", 400)
      );
    }

    await shopModel.findByIdAndDelete(req.params.id);

    res.status(201).json({
      success: true,
      message: "Seller deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get all shops
const getAllShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const shops = await shopModel.find().sort({ createdAt: -1 });
    res.status(201).json({
      success: true,
      shops,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});


module.exports = { createShop, activation, loginController, loadShop, logoutController, getShopInfo, updateShopPhoto, updateSellerInfo, adminAllSellers, adminDeleteSellers, getAllShop };