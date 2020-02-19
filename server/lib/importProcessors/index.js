const convertFloat = require('./convertFloat');
const formatDate = require('./formatDate');
const negateNumber = require('./negateNumber');
const ifColEquals = require('./ifColEquals');

const processors = {
  convertFloat: convertFloat,
  formatDate: formatDate,
  negateNumber: negateNumber,
  ifColEquals: ifColEquals
};

module.exports = processors;
