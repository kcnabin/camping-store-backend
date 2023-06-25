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
      phoneNum: user.phoneNum,
      address: user.address,
      isAdmin: user.isAdmin,
      orders: user.orders,
    });
  } catch (error) {
    next(error);
  }
});

userInfo.put("/update", requiresSignIn, async (req, res, next) => {
  const { userId } = req.dToken;

  const { name, phoneNum, address } = req.body;

  const newInfo = {
    name,
    phoneNum,
    address,
  };

  try {
    const updatedProfile = await UserModel.findByIdAndUpdate(userId, newInfo, {
      new: true,
    });

    console.log("updatedProfile :", updatedProfile);

    res.end();
  } catch (error) {
    return next(error);
  }
});

module.exports = userInfo;
