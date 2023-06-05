const home = require("express").Router();

home.get("/", (req, res) => {
  res.json({
    msg: "Homepage of express backend",
  });
});

module.exports = home;
