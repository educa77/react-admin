module.exports = (app) => {
  const roles = require("../controllers/roles.controller");
  const jwt = require("../middlewares/JWTVerifier");

  var router = require("express").Router();

  // Create a new roles
  router.post("/", roles.create);

  // Retrieve all roles
  router.get("/", roles.findAll);

  // Retrieve all published roles
  router.get("/node", roles.findAllFirstLevel);

  // Retrieve a single roles with id
  router.get("/:id", roles.findOne);

  // Update a roles with id
  router.put("/:id", roles.update);

  // Delete a roles with id
  router.delete("/:id", roles.delete);

  // Delete all roles
  router.delete("/", roles.deleteAll);

  app.use("/api/roles", router);
};
