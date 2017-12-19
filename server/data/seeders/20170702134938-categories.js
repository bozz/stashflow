'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [
      { id: 1, name: 'Household', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Transportation', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Food', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Groceries', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Clothing', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: 'Gifts', createdAt: new Date(), updatedAt: new Date() },
      { id: 7, name: 'Insurance', createdAt: new Date(), updatedAt: new Date() },
      { id: 8, name: 'Children', createdAt: new Date(), updatedAt: new Date() },
      { id: 9, name: 'Hobbies', createdAt: new Date(), updatedAt: new Date() },
      { id: 10, name: 'Health', createdAt: new Date(), updatedAt: new Date() },
      { id: 11, name: 'Travel', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
