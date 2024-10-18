const express = require("express"); //Import express
const postRoutes = require("./routes/postroutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config(); //Import env file
const mongoose = require("mongoose"); // Create connection to import mongoose

const dbUrl = process.env.MONGODB_URL; //create a varianble to hold the env file

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log(`Connected to MongoDB`);
    const app = express(); //create express instance
    const port = 5555; // create port

    //middleware
    app.use(express.json());

    // mounting
    app.use("/api", postRoutes);
    app.use("/api", userRoutes);

    app.get("/", (req, res) => {
      res.send("<h1> Hello Welcome to my Blog </h1>");
    });

    app.listen(port, () => {
      console.log(`😍😍 New Serverlistening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(`Failed to connect to mongoDB`, err);
  });
