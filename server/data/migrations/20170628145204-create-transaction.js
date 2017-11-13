'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accountId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Accounts',
          key: 'id',
          as: 'accountId',
        },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Categories',
          key: 'id',
          as: 'categoryId',
        },
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
      },
      currency: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      dataImportId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'DataImports',
          key: 'id',
          as: 'dataImportId',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface /* , Sequelize */) {
    return queryInterface.dropTable('Transactions');
  }
};
