const UserModel = require("../models/UserModel");

const isAdmin = async (req, res, next) => {
  const { userId } = req.dToken;

  try {
    const user = await UserModel.findOne({ _id: userId });

    if (user?.isAdmin) {
      return next();
    } else {
      res.json({
        isAdmin: false,
      });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { isAdmin };
