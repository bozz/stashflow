module.exports = function(sequelize, DataTypes) {
  const DataImport = sequelize.define('DataImport', {
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: DataTypes.STRING
  });

  DataImport.associate = function(models) {
    DataImport.hasMany(models.Transaction, {
      foreignKey: 'dataImportId',
      as: 'transactions'
    });
  };

  return DataImport;
};
