import User from "../models/user.model.js";
import ErrorHandler from "../utils/error.handler.js";
import cloudinary from "cloudinary";
import sendToken from "../utils/send.token.js";
import dotenv from "dotenv";
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      picture,
      password,
      status,
      confirmPassword,
      gender,
      birthday,
      country,
    } = req.body;

    const emailExisting = await User.findOne({ email });

    if (emailExisting) {
      return next(new ErrorHandler("This email is already in use", 404));
    }

    if (password !== confirmPassword) {
      return next(new ErrorHandler("Passwords do not match", 400));
    }

    let pictureData = "";
    if (picture) {
      try {
        const avatarUpload = await cloudinary.v2.uploader.upload(picture, {
          folder: "match/avatar",
          transformation: [{ width: 500, height: 500, crop: "fill" }],
        });
        pictureData = {
          public_id: avatarUpload.public_id,
          url: avatarUpload.secure_url,
        };
      } catch (error) {
        return next(
          new ErrorHandler("Error uploading image to Cloudinary", 500)
        );
      }
    }

    const user = await User.create({
      name,
      email,
      picture: pictureData || undefined,
      password,
      status,
      gender,
      birthday,
      country,
    });

    sendToken(user, 201, res);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
};

const logout = async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(0) });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

const liked = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const userToLike = await User.findById(userId);
    if (!userToLike) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (userToLike.liked.includes(req.user._id)) {
      return res
        .status(409)
        .json({ message: "You have already liked this user" });
    }

    userToLike.liked.push(req.user._id);
    userToLike.likedCount += 1;
    const me = await User.findById(req.user._id);

    me.myFavorite.push(userId);

    await me.save();
    await userToLike.save();

    return res.status(200).json({ message: "Success", user: userToLike });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const { name, status, country, city } = req.body;

    const newUserData = {
      name,
      status,
      country,
      city,
    };

    const user = await User.findByIdAndUpdate(userId, newUserData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const updatePhoto = async (req, res, next) => {
  try {
    const { picture } = req.body;

    if (!picture) {
      return next(new ErrorHandler("Photo is required", 400));
    }

    let pictureData = {};
    try {
      const avatarUpload = await upload_file(picture, "matches");
      pictureData = {
        public_id: avatarUpload.public_id,
        url: avatarUpload.secure_url,
      };
    } catch (uploadError) {
      return next(new ErrorHandler("Photo upload failed", 500));
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { picture: pictureData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    return res.status(200).json({
      message: "Photo updated successfully",
      user,
    });
  } catch (err) {
    return next(err);
  }
};

const passwordUpdate = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const isMatch = await user.comparePassword(req.body.currentPassword);

    if (!isMatch) {
      return next(new ErrorHandler("Incorrect current password", 401));
    }

    user.password = req.body.password;

    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export default {
  register,
  login,
  logout,
  liked,
  updateProfile,
  passwordUpdate,
  updatePhoto,
};
