const express = require("express");
const router = express.Router();
router.use(express.json());
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
    const recipes = await Recipe.find().skip(skipCount).limit(perPage);

    res.status(200).json({ Status: "Success", data: { recipes } });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

module.exports = router;
