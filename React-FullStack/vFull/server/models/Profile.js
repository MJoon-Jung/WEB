module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      intro: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
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
