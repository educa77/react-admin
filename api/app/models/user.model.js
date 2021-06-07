const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const db = require(".");
require("dotenv").config();

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      /*       roles: {
        type: DataTypes.VIRTUAL,
        allowNull: true,
      }, */
    },
    {
      tableName: "users",
    }
  );

  User.prototype.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
  };

  User.prototype.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  return User;
};
