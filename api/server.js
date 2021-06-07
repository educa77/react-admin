require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({ exposedHeaders: ["Content-Range"] }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("x-access-token");
  res.header("data-tree");
  next();
});

// conectamos con la base de datos y sincronizamos con los modelos
const db = require("./app/models");
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to edu's application." });
});

require("./app/routes/categories.routes")(app);
require("./app/routes/post.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/users.routes")(app);
require("./app/routes/roles.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
