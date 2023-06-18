const { requiresSignIn } = require("../middleware/requiresSignIn");
const UserModel = require("../models/UserModel");

const userInfo = require("express").Router();

userInfo.get("/", requiresSignIn, async (req, res, next) => {
  const { userId } = req.dToken;

  try {
    const user = await UserModel.findOne({ _id: userId });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      orders: user.orders,
    });
  } catch (error) {
    next(error);
  }
});

userInfo.get("/orders", requiresSignIn, async (req, res, next) => {
  const { userId } = req.dToken;

  try {
    const user = await UserModel.findById(userId).populate("orders");

    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = userInfo;
