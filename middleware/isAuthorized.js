const OrderModel = require("../models/OrderModel");

const isAuthorized = async (req, res, next) => {
  const { userId } = req.dToken;
  const { orderId } = req.params;

  try {
    const order = await OrderModel.findById(orderId);

    if (order.orderBy.toString() !== userId.toString()) {
      return next(new Error("Not Authorized!"));
    }

    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { isAuthorized };
