const router = require("express").Router();
const SavedRecipe = require("../models/savedRecipe.model");
const mongoose = require("mongoose");

//This is the route for saving a recipe in saved Recipes
router.post("/", async (req, res) => {
  try {
    const { savedRecipeOwner, savedRecipes } = req.body;

    const savedRecipe = await new SavedRecipe({
      savedRecipeOwner,
      savedRecipes,
    }).save();

    if (savedRecipe) res.status(201).json(savedRecipe);
  } catch (error) {
    console.log("Recipe not added to saved recipes", error);
    res.status(500).json({
      error: "Recipe not added to saved recipes",
      message: error.message,
    });
  }
});

//Route for viewing saved Recipes that show the userName & all recipe attributes
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const savedRecipe = await SavedRecipe.findById(id)
      .populate({ path: "savedRecipeOwner", select: "userName" })
      .populate({
        path: "savedRecipes",
        select: "recipeTitle recipeDescription photo recipeOverview",
      });

    if (savedRecipe) res.status(200).json(savedRecipe);
  } catch (error) {
    console.log("Cannot find Saved Recipes", error);
    res.status(500).json({
      error: "Cannot find Saved Recipes",
      message: error.message,
    });
  }
});

module.exports = router;
