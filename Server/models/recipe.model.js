const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    recipeTitle: {
      type: String,
      required: [true, "Title is required"],
    },
    recipeDescription: {
      type: String,
      required: [true, "Description is required"],
    },
    photo: {
      type: String,
      required: true,
    },
    recipeOverview: {
      type: String,
      required: [true, "Overview is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("recipes", recipeSchema);
