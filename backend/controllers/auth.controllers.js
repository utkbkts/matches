import User from "../models/user.model.js";
import ErrorHandler from "../utils/error.handler.js";
import cloudinary from "cloudinary";
import sendToken from "../utils/send.token.js";
import dotenv from "dotenv";
import { delete_file, upload_file } from "../utils/upload.file.js";
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
      city,
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
        console.log("🚀 ~ register ~ avatarUpload:", avatarUpload);
        pictureData = {
          public_id: avatarUpload.public_id,
          url: avatarUpload.url,
        };
      } catch (error) {
        return next(
          new ErrorHandler("Error uploading image to Cloudinary", 500)
        );
      }
    }
    console.log("🚀 ~ register ~ pictureData:", pictureData);

    const user = await User.create({
      name,
      email,
      picture: pictureData || undefined,
      password,
      status,
      gender,
      birthday,
      country,
      city,
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

    // Beğenilen kullanıcıyı bul
    const userToLike = await User.findById(userId);
    if (!userToLike) {
      return next(new ErrorHandler("User not found", 404));
    }

    const userAlreadyLiked = userToLike.liked.some(
      (like) => like.user && like.user.toString() === req.user._id.toString()
    );

    if (userAlreadyLiked) {
      await User.findByIdAndUpdate(userId, {
        $pull: { liked: { user: req.user._id } },
        $inc: { likedCount: -1 },
      });

      await User.findByIdAndUpdate(req.user._id, {
        $pull: { myFavorite: { user: userId } },
      });

      return res
        .status(200)
        .json({ message: "Like removed", user: userToLike });
    } else {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { liked: { user: req.user._id } },
        $inc: { likedCount: 1 },
      });

      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { myFavorite: { user: userId } },
      });

      return res.status(200).json({ message: "Liked added", user: userToLike });
    }
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
    let oldPictureId;
    //önceki resim kontrolü
    const user = await User.findById(req.user._id);
    if (user && user.picture) {
      oldPictureId = user.picture.public_id;
    }
    try {
      const avatarUpload = await upload_file(picture, "match/avatar");
      pictureData = {
        public_id: avatarUpload.public_id,
        url: avatarUpload.url,
      };
    } catch (error) {
      return next(new ErrorHandler("Photo upload failed", 500));
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { picture: pictureData },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedUser) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (oldPictureId) {
      await delete_file(oldPictureId);
    }

    res.status(201).json({
      message: "The photo has been updated successfully.",
    });
  } catch (err) {
    return next(new ErrorHandler("Something went wrong !!", 500));
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

const me = async (req, res, next) => {
  const userId = req?.user?._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    return next(new ErrorHandler("something went wrong !!", 400));
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
  me,
};
