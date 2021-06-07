module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      intro: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      tableName: "profile",
    }
  );
  Profile.associate = (models) => {
    Profile.belongsTo(models.Users, {
      foreignKey: "username",
      targetKey: "username",
    });
  };

  return Profile;
};
