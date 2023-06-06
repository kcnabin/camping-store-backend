const UserModel = require("../models/UserModel");

const isUser = async (req, res, next) => {
  const { userId } = req.dToken;

  try {
    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return next(new Error("Invalid User"));
    }

    if (user.isAdmin) {
      return next(new Error("User Only!"));
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = isUser;
