module.exports = function(sequelize, DataTypes) {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Tag.associate = function(models) {
    // associations can be defined here
  };

  return Tag;
};
