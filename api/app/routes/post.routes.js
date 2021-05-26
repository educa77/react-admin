module.exports = (app) => {
  const posts = require("../controllers/post.controller");

  var router = require("express").Router();

  // Create a new posts
  router.post("/", posts.create);

  // Retrieve all posts
  router.get("/", posts.findAll);

  // Retrieve all published posts
  router.get("/node", posts.findAllFirstLevel);

  // Retrieve a single posts with id
  router.get("/:id", posts.findOne);

  // Update a posts with id
  router.put("/:id", posts.update);

  // Delete a posts with id
  router.delete("/:id", posts.delete);

  // Delete all posts
  router.delete("/", posts.deleteAll);

  app.use("/api/posts", router);
};
