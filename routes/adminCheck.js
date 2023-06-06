const { requiresSignIn } = require("../middleware/requiresSignIn");
const UserModel = require("../models/UserModel");

const adminCheck = require("express").Router();

adminCheck.get("/", requiresSignIn, async (req, res, next) => {
  const { userId } = req.dToken;
  console.log("userId :", userId);

  try {
    const user = await UserModel.findOne({ _id: userId });
    console.log("user :", user);
    if (user?.isAdmin) {
      res.json({
        isAdmin: true,
      });
      return;
    } else {
      res.json({
        isAdmin: false,
      });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = adminCheck;
