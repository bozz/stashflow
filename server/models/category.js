module.exports = function(sequelize, DataTypes) {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT
  });

  Category.associate = function(models) {
    Category.hasMany(models.Transaction, {
      foreignKey: 'categoryId',
      as: 'transactions'
    });
  };

  return Category;
};
