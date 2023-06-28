const { hashPassword } = require("../helper/hashPassword");
const { requiresSignIn } = require("../middleware/requiresSignIn");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const changePassword = require("express").Router();

changePassword.put("/", requiresSignIn, async (req, res, next) => {
  const { userId } = req.dToken;
  const { password, newPassword } = req.body;

  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return next(new Error("Invalid User!"));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      return next(new Error("Incorrect Password"));
    }

    const passwordHash = await hashPassword(newPassword);
    user.passwordHash = passwordHash;

    await user.save();
    res.json({
      msg: "Password changed!",
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = changePassword;
