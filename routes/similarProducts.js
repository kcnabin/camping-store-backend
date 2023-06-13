const CategoryModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModel");

const similarProducts = require("express").Router();

similarProducts.get("/:pId/:cId", async (req, res, next) => {
  const { pId, cId } = req.params;

  try {
    const similarPro = await ProductModel.find({
      categoryId: cId,
      _id: { $ne: pId },
    }).limit(4);

    res.json(similarPro);
  } catch (error) {
    return next(error);
  }
});

module.exports = similarProducts;
