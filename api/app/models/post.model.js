module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  const Post = sequelize.define(
    "Post",
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
      post_id: {
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
      tableName: "posts",
    }
  );

  // This section contains the relationships for this model.
  Post.associate = (models) => {
    Post.belongsTo(models.Post, {
      foreignKey: {
        name: "postIdKey",
        field: "post_id",
      },
      targetKey: "id",
      as: "Category",
    });
    Post.hasMany(models.Post, {
      foreignKey: {
        name: "postIdKey",
        field: "post_id",
      },
      sourceKey: "id",
      as: "subPosts",
    });
  };

  return Post;
};
