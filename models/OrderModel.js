const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: [
        "processing",
        "accepted",
        "shipped",
        "delivered",
        "cancelled",
        "declined",
      ],
      default: "processing",
    },
    grandTotal: {
      type: Number,
      required: true,
    },
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shippingInfo: {
      fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phoneNum: {
        type: String,
        required: true,
      },
      address: {
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
      },
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    payment: {
      paymentType: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
