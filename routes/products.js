const { isAdmin } = require("../middleware/isAdmin");
const { requiresSignIn } = require("../middleware/requiresSignIn");
const ProductModel = require("../models/ProductModel");

const products = require("express").Router();

products.post("/add", requiresSignIn, isAdmin, async (req, res, next) => {
  const {
    category,
    categoryId,
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
    categoryId,
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

products.get("/all/:page", async (req, res, next) => {
  const perPage = 4;

  const { page } = req.params;
  if (!page) {
    page = 1;
  }
  console.log("page :", page);

  try {
    const products = await ProductModel.find({})
      .skip((Number(page) - 1) * perPage)
      .limit(perPage);

    const total = await ProductModel.estimatedDocumentCount();
    res.json({
      products,
      total,
    });
  } catch (error) {
    next(error);
  }
});

products.get("/category/:cId", async (req, res, next) => {
  const categoryId = req.params.cId;

  try {
    const categoryProducts = await ProductModel.find({ categoryId });
    res.json(categoryProducts);
  } catch (error) {
    next(error);
  }
});

products.get("/:pId", async (req, res, next) => {
  const { pId } = req.params;

  try {
    const product = await ProductModel.findById(pId).populate("categoryId");
    res.json(product);
  } catch (error) {
    return next(error);
  }
});

products.put("/:pId", requiresSignIn, isAdmin, async (req, res, next) => {
  const { pId } = req.params;

  const {
    category,
    categoryId,
    name,
    brand,
    size,
    color,
    price,
    discount,
    photos,
    descriptions,
  } = req.body;

  const productToUpdate = {
    category,
    categoryId,
    name,
    brand,
    size,
    color,
    price,
    discount: Number(discount),
    photos,
    descriptions,
  };

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      pId,
      productToUpdate,
      {
        new: true,
      }
    );
    res.json(updatedProduct);
  } catch (error) {
    return next(error);
  }
});

products.get("/random/:number", async (req, res, next) => {
  let number = Number(req.params.number);
  if (!number) {
    number = 4;
  }

  try {
    const randomProducts = await ProductModel.aggregate([
      {
        $sample: { size: number },
      },
    ]);

    res.json(randomProducts);
  } catch (error) {
    return next(error);
  }
});

module.exports = products;
