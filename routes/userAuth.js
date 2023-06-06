const isUser = require("../middleware/isUser");
const { requiresSignIn } = require("../middleware/requiresSignIn");

const userAuth = require("express").Router();

userAuth.get("/", requiresSignIn, isUser, async (req, res) => {
  res.json({
    ok: true,
  });
});

module.exports = userAuth;
