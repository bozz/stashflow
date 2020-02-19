const applyMapping = require('./applyMapping');
const convertFloat = require('./convertFloat');
const getColValue = require('./getColValue');
const formatDate = require('./formatDate');
const ifColEquals = require('./ifColEquals');
const negateNumber = require('./negateNumber');
const splitAndSlice = require('./splitAndSlice');

const processors = {
  applyMapping: applyMapping,
  convertFloat: convertFloat,
  getColValue: getColValue,
  formatDate: formatDate,
  ifColEquals: ifColEquals,
  negateNumber: negateNumber,
  splitAndSlice: splitAndSlice
};

module.exports = processors;
