import User from "../models/user.model.js";
import apiFilter from "../utils/api.filters.js";

const memberFilters = async (req, res, next) => {
  try {
    const resPerPage = 5;
    const apiFilters = new apiFilter(User, req.query).searchResults().filters();

    let users = await apiFilters.query.exec();
    const FilteredProductCount = await User.countDocuments(apiFilters.query);

    apiFilters.pagination(resPerPage);
    users = await apiFilters.query.clone();

    res.status(200).json({
      resPerPage,
      totalCount: FilteredProductCount,
      users,
    });
  } catch (err) {
    next(err);
  }
};

export default { memberFilters };
