const UserModel = require("../models/UserModel");

const isAdmin = async (req, res, next) => {
  const { userId } = req.dToken;

  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return next(new Error("Invalid User ID"));
    }

    if (!user.isAdmin) {
      return next(new Error("Admin Only!"));
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isAdmin };
