const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const userRoutes = require("./Routes/userRouter");
const recipeRoutes = require("./Routes/recipeRouter");
const savedRecipesRoutes = require("./Routes/savedRecipesRouter");
const otpsRoutes = require("./Routes/otpRouter");
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log(`MongoDB Server Started `);

  // Create index on the 'recipeTitle' field of the 'recipes' collection
  mongoose.connection.db
    .collection("recipes")
    .createIndex({ recipeTitle: 1, ingredients: 1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
});

const port = process.env.PORT;

app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/savedRecipes", savedRecipesRoutes);
app.use("/api/otps", otpsRoutes);

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
