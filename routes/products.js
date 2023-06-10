const { isAdmin } = require("../middleware/isAdmin");
const { requiresSignIn } = require("../middleware/requiresSignIn");
const ProductModel = require("../models/ProductModel");

const products = require("express").Router();

products.post("/add", requiresSignIn, isAdmin, async (req, res, next) => {
  const {
    category,
    name,
    brand,
    size,
    color,
    price,
    discount,
    photos,
    descriptions,
  } = req.body;

  const productObject = new ProductModel({
    category,
    name,
    brand,
    size,
    color,
    price,
    discount,
    photos,
    descriptions,
  });

  try {
    const savedProduct = await productObject.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = products;
