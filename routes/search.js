const ProductModel = require("../models/ProductModel");

const search = require("express").Router();

search.get("/:searchText", async (req, res, next) => {
  const { searchText } = req.params;
  const search = searchText.replaceAll("+", " ");

  try {
    const searchedProducts = await ProductModel.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    }).limit(6);

    res.json(searchedProducts);
  } catch (error) {
    return next(error);
  }
});

module.exports = search;
