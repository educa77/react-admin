const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Role_user = sequelize.define(
    "Role_user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      role_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "role_users",
    }
  );
  return Role_user;
};
