const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const savedRecipeSchema = new mongoose.Schema(
  {
    savedRecipeOwner: {
      type: ObjectId,
      ref: "users",
    },
    savedRecipes: {
      type: ObjectId,
      ref: "recipes",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("savedRecipes", savedRecipeSchema);
