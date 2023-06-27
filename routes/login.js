const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_KEY = process.env.JWT_KEY;
const UserModel = require("../models/UserModel");

const login = require("express").Router();

login.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Error("Both email & password are required!"));
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return next(new Error("User not in database"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.passwordHash
    );

    if (!isPasswordCorrect) {
      return next(new Error("Incorrect Password"));
    }

    const token = jwt.sign({ userId: user._id.toString() }, JWT_KEY, {
      expiresIn: 3 * 60 * 60,
    });

    res.json({
      token,
      user: {
        name: user.name,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = login;
