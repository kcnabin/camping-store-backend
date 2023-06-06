const { isAdmin } = require("../middleware/isAdmin");
const { requiresSignIn } = require("../middleware/requiresSignIn");

const adminCheck = require("express").Router();

adminCheck.get("/", requiresSignIn, isAdmin, (req, res) => {
  res.json({
    isAdmin: true,
  });
});

module.exports = adminCheck;
