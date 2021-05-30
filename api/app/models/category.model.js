module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  const Category = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
      },
      expanded: {
        type: DataTypes.BOOLEAN,
      },
      category_id: {
        type: DataTypes.BIGINT,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "categories",
    }
  );

  Category.associate = (models) => {
    Category.belongsTo(models.Category, {
      foreignKey: {
        name: "categoryIdKey",
        field: "category_id",
      },
      targetKey: "id",
      as: "Category",
    });
    Category.hasMany(models.Category, {
      foreignKey: {
        name: "categoryIdKey",
        field: "category_id",
      },
      sourceKey: "id",
      as: "subCategories",
    });
  };

  return Category;
};
