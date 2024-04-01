const mongoose = require("mongoose");

const savedRecipeSchema = new mongoose.Schema({
  savedRecipeOwner: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  savedRecipes: {
    type: mongoose.Types.ObjectId,
    ref: "recipes",
  },
});

module.exports = mongoose.model("savedRecipes", savedRecipeSchema);
