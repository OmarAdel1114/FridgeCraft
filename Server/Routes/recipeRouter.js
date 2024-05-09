const express = require("express");
const router = express.Router();
router.use(express.json());
// const multer = require("multer");
// const diskStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     const filename = `recipe-${Date.now()}.${ext}`;
//     cb(null, filename);
//   },
// });
// const fileFilter = (req, file, cb) => {
//   const imageType = file.mimetype.split("/")[0];
//   if (imageType === "image") {
//     return cb(null, true);
//   } else {
//     return cb("must be an image", false);
//   }
// };

// const upload = multer({
//   storage: diskStorage,
//   fileFilter,
// });
// const cloudinary = require('../utils/cloudinary');

const upload = require("../Middlewares/upload");
const {
  uploadToCloudinary,
  removeFromCloudinary,
} = require("../utils/cloudinary");

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

router.post("/add", async (req, res) => {
  try {
    const { recipeTitle, recipeOverview, instructions, ingredients } = req.body;
    const ingredientsArray = Array.isArray(ingredients)
      ? ingredients
      : ingredients.split(","); // Split ingredients string into an array

    // Check if any required attribute is missing or empty
    if (!recipeTitle || !recipeOverview || !ingredients || !instructions) {
      console.log(req.body);
      throw new Error("All attributes must be provided.");
    }
    const recipe = new Recipe({
      recipeTitle,
      recipeOverview,
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

router.post("/image/:id", upload.single("recipeImage"), async (req, res) => {
  try {
    // Upload Image to Cloudinary
    const data = await uploadToCloudinary(req.file.path, "recipe-images");
    // Save Image Url and publicId to the database
    const savedImg = await Recipe.updateOne(
      { _id: req.params.id },
      {
        $set: {
          imageUrl: data.url,
          publicId: data.public_id,
        },
      }
    );
    console.log(data);
    res.status(200).send("Recipe image uploaded successfully!");
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(400).send("Error uploading image: " + error.message);
  }
});

router.get("/search", async (req, res) => {
  const { recipeTitle, ingredients } = req.query;
  try {
    let query = {};

    // If recipeTitle is provided, add it to the query
    if (recipeTitle) {
      query.recipeTitle = { $regex: recipeTitle, $options: "i" }; // Case-insensitive search
    }

    // If ingredients is provided, add it to the query
    if (ingredients) {
      query.ingredients = { $all: ingredients.split(",") }; // Search for recipes containing all provided ingredients
    }

    const recipes = await Recipe.find(query);
    if (recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }
  } catch (error) {
    console.log("cannot find recipe");
    res.status(500).json(error.message);
  }
});

module.exports = router;
