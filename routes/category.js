const { isAdmin } = require("../middleware/isAdmin");
const { requiresSignIn } = require("../middleware/requiresSignIn");
const CategoryModel = require("../models/CategoryModel");
const slugify = require("slugify");

const category = require("express").Router();

category.post("/", requiresSignIn, isAdmin, async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new Error("Category Name is required!"));
  }

  const newCategory = new CategoryModel({
    name,
    slug: slugify(name.toLowerCase()),
  });

  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    next(error);
  }
});

category.get("/all", async (req, res, next) => {
  try {
    const categories = await CategoryModel.find({});
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

category.delete(
  "/:categoryId",
  requiresSignIn,
  isAdmin,
  async (req, res, next) => {
    const { categoryId } = req.params;

    try {
      await CategoryModel.findByIdAndDelete(categoryId);
      res.end();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = category;
