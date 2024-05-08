const router = require("express").Router();
const SavedRecipe = require("../models/savedRecipe.model");
const mongoose = require("mongoose");
const Recipe = require("../models/recipe.model");
const User = require("../models/user.model");

//This is the route for saving a recipe in saved Recipes
router.post("/", async (req, res) => {
  try {
    const { recipe, user } = req.body;

    const savRecipes = await Recipe.findOne({ recipeTitle: recipe });
    const Owner = await User.findOne({ userName: user });
    // const savedRecipe = await new SavedRecipe({
    //   savedRecipeOwner,
    //   savedRecipes,
    // }).save();

    res.json(
      await SavedRecipe.create({ recipe: savRecipes._id, user: Owner._id })
    );
    console.log({ recipe, user });
    // if (savedRecipe) res.status(201).json(savedRecipe);
  } catch (error) {
    console.log("Recipe not added to saved recipes", error);
    res.status(500).json({
      error: "Recipe not added to saved recipes",
      message: error.message,
    });
  }
});

//Route for viewing saved Recipes that show the userName & all recipe attributes
router.get("/:user", async (req, res) => {
  try {
    // const id = req.params.id;
    const savedRecipe = await SavedRecipe.find({ user: req.params.user })
      .populate({
        path: "recipe",
        select: "recipeTitle recipeDescription photo recipeOverview",
      })
      .populate({ path: "user", select: "userName" });

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
