module.exports = function(sequelize, DataTypes) {
  const Account = sequelize.define('Account', {
    key: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bank: {
      type: DataTypes.STRING,
      allowNull: false
    },
    iban: {
      type: DataTypes.STRING
    },
    bic: {
      type: DataTypes.STRING
    },
    description: DataTypes.TEXT
  });

  Account.associate = function(models) {
    Account.hasMany(models.Transaction, {
      foreignKey: 'accountId',
      as: 'transactions'
    });
  };

  return Account;
};
