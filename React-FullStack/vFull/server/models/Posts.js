module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    "Posts",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      tableName: "posts",
    }
  );
  Posts.associate = (models) => {
    Posts.belongsTo(models.Users, {
      foreignKey: "username",
      targetKey: "username",
      onDelete: "cascade",
    });
    Posts.hasMany(models.Comments, {
      foreignKey: "PostId",
      sourceKey: "id",
      onDelete: "cascade",
    });
  };

  return Posts;
};
