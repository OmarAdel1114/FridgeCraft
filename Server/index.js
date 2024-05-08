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

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log(`MongoDB Server Started `);
});

const port = process.env.PORT;

app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/savedRecipes", savedRecipesRoutes);

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
