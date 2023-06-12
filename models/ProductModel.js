const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    descriptions: {
      type: Array,
      required: true,
    },
    photos: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);
const ProductModel = mongoose.model("Products", ProductSchema);
module.exports = ProductModel;
