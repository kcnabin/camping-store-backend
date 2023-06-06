const { hashPassword } = require("../helper/hashPassword");
const UserModel = require("../models/UserModel");

const register = require("express").Router();

register.post("/", async (req, res, next) => {
  console.log("req.body :", req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new Error("All fields are necessary!"));
  }

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return next(new Error("User already registered!"));
    }

    const passwordHash = await hashPassword(password);
    const newUser = new UserModel({
      name,
      email,
      passwordHash,
      isAdmin: false,
    });

    await newUser.save();

    res.json({
      msg: "new user registered!",
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = register;
