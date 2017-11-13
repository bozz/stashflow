module.exports = function(sequelize, DataTypes) {
  const Transaction = sequelize.define('Transaction', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    currency: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Account, {
      as: 'account',
      foreignKey: 'accountId',
      onDelete: 'CASCADE'
    });
    Transaction.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'SET NULL'
    });
    Transaction.belongsTo(models.DataImport, {
      foreignKey: 'dataImportId',
      onDelete: 'CASCADE'
    });
  };

  return Transaction;
};
