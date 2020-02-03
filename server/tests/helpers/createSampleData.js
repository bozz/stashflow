function createSampleData(db) {
  db.models.Account.bulkCreate([
    {
      key: 'bankA22',
      type: 'Girokonto',
      name: 'Bank A',
      bank: 'Bank A',
      iban: 'DE01 1234 1234 1234 1234 00',
      bic: 'BANKAISOK',
      description: 'sample bank account'
    },
    {
      key: 'bankB22',
      type: 'Girokonto',
      name: 'Bank B',
      bank: 'Bank B',
      iban: 'DE11 1111 1111 1111 1111 00',
      bic: 'BANKBISWELL',
      description: 'another sample bank account'
    }
  ]);
}

module.exports = createSampleData;
