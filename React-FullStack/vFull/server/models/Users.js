module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      tableName: "users",
    }
  );
  Users.associate = (models) => {
    Users.hasMany(models.Posts, {
      foreignKey: "username",
      sourceKey: "username",
      onDelete: "cascade",
    }),
      Users.hasOne(models.Profile, {
        foreignKey: "username",
        sourceKeyx: "username",
        onDelete: "cascade",
      }),
      Users.hasMany(models.Comments, {
        foreignKey: "username",
        sourceKey: "username",
        onDelete: "cascade",
      });
  };

  return Users;
};
