module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "Comments",
    {
      commentBody: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      tableName: "comments",
    }
  );

  Comments.associate = (models) => {
    Comments.belongsTo(models.Users, {
      foreignKey: "username",
      targetKey: "username",
      onDelete: "cascade",
    });
    Comments.belongsTo(models.Posts, {
      foreignKey: "PostId",
      targetKey: "id",
      onDelete: "cascade",
    });
  };

  return Comments;
};
