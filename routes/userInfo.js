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
    });
  } catch (error) {
    next(error);
  }
});

module.exports = userInfo;
