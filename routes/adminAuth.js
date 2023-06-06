const { isAdmin } = require("../middleware/isAdmin");
const { requiresSignIn } = require("../middleware/requiresSignIn");

const adminAuth = require("express").Router();

adminAuth.get("/", requiresSignIn, isAdmin, async (req, res, next) => {
  res.json({
    ok: true,
  });
});

module.exports = adminAuth;
