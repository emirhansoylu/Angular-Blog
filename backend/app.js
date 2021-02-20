const express = require("express");
const bodyParser = require("body-parser");

const Post = require("./model/post");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
//1DKy3vZmrjBPkSi3
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  console.log(post);
  res.status(201).json({
    message: "Post added successfully",
  });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "adasd232",
      title: "First server side post",
      content: "This is server",
    },
    {
      id: "adasd2",
      title: "Second server side post",
      content: "This is server",
    },
    { id: "3323", title: "Third server side post", content: "Zınk" },
  ];

  res.status(200).json({
    message: "Post fetched successfully!",
    posts: posts,
  });
});

module.exports = app;
