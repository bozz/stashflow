'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Accounts', [{
      id: 1,
      key: 'bankA',
      type: 'Girokonto',
      name: 'Bank A',
      bank: 'Bank A',
      iban: 'DE01 1234 1234 1234 1234 00',
      bic: 'BANKAISOK',
      description: 'sample bank account',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      key: 'bankB',
      type: 'Girokonto',
      name: 'Bank B',
      bank: 'Bank B',
      iban: 'DE11 1111 1111 1111 1111 00',
      bic: 'BANKBISWELL',
      description: 'another sample bank account',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Accounts', null, {});
  }
};
