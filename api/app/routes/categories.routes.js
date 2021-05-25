module.exports = (app) => {
  const categories = require("../controllers/category.controller");

  var router = require("express").Router();

  // Create a new Categories
  router.post("/", categories.create);

  // Retrieve all categories
  router.get("/", categories.findAll);

  // Retrieve all published categories
  router.get("/node", categories.findAllFirstLevel);

  // Retrieve a single Categories with id
  router.get("/:id", categories.findOne);

  // Update a Categories with id
  router.put("/:id", categories.update);

  // Delete a Categories with id
  router.delete("/:id", categories.delete);

  // Delete all categories
  router.delete("/", categories.deleteAll);

  app.use("/api/categories", router);
};
