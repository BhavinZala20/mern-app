const userModel = require("../Models/UserModel.js");
const shopModel = require("../Models/ShopModel.js");
const path = require("path");
const crypto = require('crypto');
const { hashPassword } = require("./../Helper/authHelper.js");
const JWT = require("jsonwebtoken");
const ErrorHandler = require("../Utils/ErrorHandler.js");
const fs = require("fs");
const sendMail = require("../Utils/sendMail");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors.js");
const sendToken = require("../Utils/jwtToken.js");

const registerController = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check exisiting user
    const exisitingUser = await userModel.findOne({ email });

    if (exisitingUser) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" })
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };
    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email : ${user.email} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    // console.error(error.stack);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
});

// Create Activation Token
const createActivationToken = (user) => {
  return JWT.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m"
  });
};

// Activate user
const activation = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    const newUser = JWT.verify(
      activation_token,
      process.env.ACTIVATION_SECRET
    );

    if (!newUser) {
      return next(new ErrorHandler("Invalid token", 400));
    }
    const { name, email, password, avatar } = newUser;

    let user = await userModel.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }
    user = await userModel.create({
      name,
      email,
      avatar,
      password,
    });

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//POST LOGIN
const loginController = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide the all fields!", 400));
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Invalid credentials....!", 400)
      );
    }

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// load user
const loadUser = catchAsyncErrors(async (req, res, next) => {
  try {
    // console.log(req.user);
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in loadUser:", error);
    return next(new ErrorHandler(error.message, 500));
  }
});

//Get LOGOUT
const logoutController = catchAsyncErrors(async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json({
      success: true,
      message: "Logout successful!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});


const updateProfile = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password, phoneNumber, name } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Invalid Password", 400)
      );
    }

    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update user avatar
const updateProfileAvatar = catchAsyncErrors(async (req, res, next) => {
  try {

    const existsUser = await userModel.findById(req.user.id);

    const existAvatarPath = `uploads/${existsUser.avatar}`;

    fs.unlinkSync(existAvatarPath);

    const fileUrl = path.join(req.file.filename);

    const user = await userModel.findByIdAndUpdate(req.user.id, { avatar: fileUrl });

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update user addresses
const updateUserAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);

    const sameTypeAddress = user.addresses.find(
      (address) => address.addressType === req.body.addressType
    );
    if (sameTypeAddress) {
      return next(
        new ErrorHandler(`${req.body.addressType} address already exists`)
      );
    }

    const existsAddress = user.addresses.find(
      (address) => address._id === req.body._id
    );

    if (existsAddress) {
      Object.assign(existsAddress, req.body);
    } else {
      // add the new address to the array
      user.addresses.push(req.body);
    }

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Delete user addresses
const deleteUserAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    await userModel.updateOne(
      {
        _id: userId,
      },
      { $pull: { addresses: { _id: addressId } } }
    );

    const user = await userModel.findById(userId);

    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update user password
const updateUserPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(
      req.body.oldPassword
    );

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(
        new ErrorHandler("Password doesn't matched", 400)
      );
    }
    user.password = req.body.newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }

});

// Find user infoormation with the userId
const userInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get all users for admin
const adminAllUsers = catchAsyncErrors(async (req, res, next) => {
  try {
    const users = await userModel.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Delete users for admin
const adminDeleteUsers = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler("User is not available with this id", 400)
      );
    }
    await userModel.findByIdAndDelete(req.params.id);

    res.status(201).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Forgot Password
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });
    let shop = await shopModel.findOne({ email });

    if (!user && !shop) {
      return next(new ErrorHandler('No user or shop found with this email', 404));
    }

    if (user) {
      // Setup new password for the user
      user.password = password; // This will trigger the pre-save hook to hash the password
      await user.save();
    }

    if (shop) {
      // Setup new password for the shop
      shop.password = password; // This will trigger the pre-save hook to hash the password
      await shop.save();
    }
    res.status(201).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});


module.exports = { registerController, activation, loginController, loadUser, logoutController, updateProfile, updateProfileAvatar, updateUserAddress, deleteUserAddress, updateUserPassword, userInfo, adminAllUsers, adminDeleteUsers, forgotPassword };