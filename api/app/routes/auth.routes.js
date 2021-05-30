module.exports = (app) => {
  const auth = require("../controllers/auth.controller");
  var router = require("express").Router();

  router.post("/login", auth.login);
  router.post("/logout", auth.logout);
  router.post("/register", auth.register);

  app.use("/api/users", router);
};
