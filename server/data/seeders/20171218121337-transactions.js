'use strict';

const subDays = require('date-fns/subDays');
const formatDate = require('date-fns/format');

function getRandom(from, to) {
  from = from || 1;
  to = to || 10;
  return Math.floor(Math.random() * to + from);
}

function getRandomDate() {
  return formatDate(subDays(new Date(), getRandom(1, 500)), 'yyyy-MM-dd');
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    const transactions = [];

    for (var i = 0; i < 500; i++) {
      transactions.push({
        accountId: 1,
        categoryId: getRandom(1, 11),
        target: 'transaction' + i,
        type: 'Invoice',
        date: getRandomDate(),
        amount: getRandom(1, 150000) * 0.01,
        currency: 'EUR',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    return queryInterface.bulkInsert('Transactions', transactions, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transactions', null, {});
  }
};
