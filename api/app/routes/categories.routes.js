module.exports = (app) => {
  const categories = require("../controllers/category.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", categories.create);

  // Retrieve all categories
  router.get("/", categories.findAll);

  // Retrieve all published categories
  router.get("/node", categories.findAllFirstLevel);

  // Retrieve a single Tutorial with id
  router.get("/:id", categories.findOne);

  // Update a Tutorial with id
  router.put("/:id", categories.update);

  // Delete a Tutorial with id
  router.delete("/:id", categories.delete);

  // Delete all categories
  //router.delete("/", categories.deleteAll);

  app.use("/api/categories", router);
};
