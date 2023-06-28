const ProductModel = require("../models/ProductModel");
const categoryProducts = require("express").Router();

categoryProducts.get("/filter/:cId/:rangeId", async (req, res, next) => {
  const { cId, rangeId } = req.params;
  let range = rangeId.split("-");

  try {
    const product = await ProductModel.find({
      categoryId: cId,
      price: {
        $gt: Number(range[0]),
        $lt: Number(range[1]),
      },
    });

    res.json(product);
  } catch (error) {
    return next(error);
  }
});

categoryProducts.get("/:cId", async (req, res, next) => {
  const categoryId = req.params.cId;

  try {
    const categoryProducts = await ProductModel.find({ categoryId });
    res.json(categoryProducts);
  } catch (error) {
    next(error);
  }
});

module.exports = categoryProducts;
