import User from "../models/user.model.js";
import apiFilter from "../utils/api.filters.js";
import ErrorHandler from "../utils/error.handler.js";

const memberFilters = async (req, res, next) => {
  try {
    const resPerPage = 5;
    const apiFilters = new apiFilter(User, req.query).searchResults().filters();

    let users = await apiFilters.query.exec();

    const FilteredProductCount = await User.countDocuments(apiFilters.query);

    apiFilters.pagination(resPerPage);
    users = await apiFilters.query.clone();

    const userAll = await User.find().lean();

    res.status(200).json({
      resPerPage,
      totalCount: FilteredProductCount,
      users,
      userAll,
    });
  } catch (err) {
    next(err);
  }
};

// memberGetById fonksiyonu
const memberGetById = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId)
      .populate("liked.user")
      .populate("myFavorite.user");

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

const memberGetAll = async (req, res, next) => {
  try {
    const members = await User.find().lean();
    res.status(200).json({ members });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

const usersProfileId = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).lean();
    res.status(200).json({ user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export default { memberFilters, memberGetById, memberGetAll, usersProfileId };
