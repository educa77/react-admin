const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.categories = require("./category.model.js")(sequelize, Sequelize);
db.posts = require("./post.model.js")(sequelize, Sequelize);
db.users = require("./user.model")(sequelize, Sequelize);
db.roles = require("./role.model")(sequelize, Sequelize);
db.role_user = require("./role_user.model")(sequelize, Sequelize);

db.users.belongsToMany(db.roles, {
  through: db.role_user,
  as: "roles",
  foreignKey: "user_id",
});
db.roles.belongsToMany(db.users, {
  through: db.role_user,
  foreignKey: "role_id",
  otherKey: "user_id",
});

module.exports = db;
