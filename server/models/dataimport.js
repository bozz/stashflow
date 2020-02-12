module.exports = function(sequelize, DataTypes) {
  const DataImport = sequelize.define('DataImport', {
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    config: {
      type: DataTypes.JSON,
      allowNull: false,
      devaultValue: {}
    }
  });

  DataImport.associate = function(models) {
    DataImport.hasMany(models.Transaction, {
      foreignKey: 'dataImportId',
      as: 'transactions'
    });
  };

  return DataImport;
};
