const { requiresSignIn } = require("../middleware/requiresSignIn");
const UserModel = require("../models/UserModel");

const userOrders = require("express").Router();

userOrders.get("/", requiresSignIn, async (req, res, next) => {
  const { userId } = req.dToken;

  try {
    const user = await UserModel.findById(userId).populate({
      path: "orders",
      populate: [
        {
          path: "orderItems",
          populate: {
            path: "product",
          },
        },
      ],
    });

    res.json(user.orders);
  } catch (error) {
    next(error);
  }
});

module.exports = userOrders;
