const express = require("express");
const router = express.Router();
router.use(express.json());
const multer = require("multer");
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const filename = `recipe-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});
const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    return cb(null, true);
  } else {
    return cb("must be an image", false);
  }
};

const upload = multer({
  storage: diskStorage,
  fileFilter,
});
// const cloudinary = require('../utils/cloudinary');
const mongoose = require("mongoose");
require("dotenv").config();
const Recipe = require("../models/recipe.model");
const jwt = require("jsonwebtoken");
const verifyToken = require("../Middlewares/auth.middleware");

// Get All Recipes
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 3; // Default to 3 users per page
    const skipCount = (page - 1) * perPage;

    // getting all recipes
    const recipes = await Recipe.find();
    // .skip(skipCount).limit(perPage);

    res.status(200).json({ Status: "Success", data: { recipes } });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

router.post("/add", upload.single("photo"), async (req, res) => {
  try {
    const { recipeTitle, recipeOverview, ingredients, instructions } = req.body;
    const photo = req.file;
    // Check if any required attribute is missing or empty
    if (
      !recipeTitle ||
      !photo ||
      !recipeOverview ||
      !ingredients ||
      !instructions
    ) {
      throw new Error("All attributes must be provided.");
    }
    const recipe = new Recipe({
      recipeTitle,
      recipeOverview,
      photo: photo.path,
      ingredients,
      instructions,
    });
    const newRecipe = await recipe.save();

    res.status(200).json({
      status: "Recipe Added successfully",
      data: { newRecipe },
    });
  } catch (error) {
    console.error("Adding Recipe Failed", error);
    res
      .status(400)
      .json({ error: "Adding Recipe Failed", message: error.message });
  }
});

module.exports = router;
