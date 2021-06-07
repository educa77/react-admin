const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.ENUM("admin", "client", "user"),
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "roles",
    }
  );
  return Role;
};
