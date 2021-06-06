module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define(
    "File",
    {
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      tableName: "file",
    }
  );
  File.associate = (models) => {
    File.belongsTo(models.Profile, {
      foreignKey: "image",
      targetKey: "img",
    });
  };

  return File;
};
