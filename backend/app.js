const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const postRoutes = require("./route/post");
const userRoutes = require("./route/user");

const app = express();

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://duckbuddyy:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0.pxfvc.mongodb.net/node-angular"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/image", express.static(path.join("backend/image")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
