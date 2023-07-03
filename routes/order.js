const { isAdmin } = require("../middleware/isAdmin");
const { isAuthorized } = require("../middleware/isAuthorized");
const { requiresSignIn } = require("../middleware/requiresSignIn");
const OrderModel = require("../models/OrderModel");
const UserModel = require("../models/UserModel");

const order = require("express").Router();

order.post("/", requiresSignIn, async (req, res, next) => {
  const { grandTotal, orderBy, shippingInfo, orderItems, payment } = req.body;
  const { userId } = req.dToken;

  const orderObject = {
    grandTotal,
    orderBy,
    shippingInfo,
    orderItems,
    payment: {
      paymentType: payment,
    },
  };

  const newOrder = new OrderModel(orderObject);

  try {
    const savedOrder = await newOrder.save();
    const orderId = savedOrder._id;
    const user = await UserModel.findById(userId);
    user.orders.push(orderId);
    await user.save();
    res.json(savedOrder);
  } catch (error) {
    return next(error);
  }
});

order.put(
  "/cancel/:orderId",
  requiresSignIn,
  isAuthorized,
  async (req, res, next) => {
    const { orderId } = req.params;

    try {
      const order = await OrderModel.findById(orderId);
      order.status = "cancelled";
      await order.save();

      res.json({
        msg: "order cancelled!",
      });
    } catch (error) {
      return next(error);
    }
  }
);

order.put("/:orderId", requiresSignIn, isAdmin, async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (
    ![
      "processing",
      "accepted",
      "shipped",
      "delivered",
      "cancelled",
      "declined",
    ].includes(status)
  ) {
    return next(new Error("Order status/action not valid"));
  }

  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    return next(error);
  }
});

order.get("/:orderId", requiresSignIn, async (req, res, next) => {
  const { orderId } = req.params;
  const { userId } = req.dToken;

  try {
    const fetchedOrder = await OrderModel.findOne({ _id: orderId }).populate([
      {
        path: "orderItems",
        populate: {
          path: "product",
        },
      },
    ]);

    if (!fetchedOrder) {
      return next(new Error("Invalid Order Id"));
    }

    if (fetchedOrder.orderBy.toString() !== userId.toString()) {
      return next(new Error("Not Authorized!"));
    }

    res.json(fetchedOrder);
  } catch (error) {
    return next(error);
  }
});

order.get(
  "/status/:statusName",
  requiresSignIn,
  isAdmin,
  async (req, res, next) => {
    const { statusName } = req.params;

    try {
      const allOrders = await OrderModel.find({ status: statusName }).populate([
        {
          path: "orderItems",
          populate: {
            path: "product",
          },
        },
      ]);
      res.json(allOrders);
    } catch (error) {
      return next(error);
    }
  }
);

order.get("/", requiresSignIn, isAdmin, async (req, res, next) => {
  try {
    const allOrders = await OrderModel.find({}).populate([
      {
        path: "orderItems",
        populate: {
          path: "product",
        },
      },
    ]);
    res.json(allOrders);
  } catch (error) {
    return next(error);
  }
});

module.exports = order;
