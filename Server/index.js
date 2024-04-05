const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./Routes/userRouter");

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log(`MongoDB Server Started `);
});

const port = process.env.PORT;

app.use(cors());

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
