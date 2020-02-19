/**
 * Returns the value of specified column (ignores input value)
 * @param {*} value
 * @param {array} row
 * @param {object} args
 * @param {number} args.col - target column index position
 */
const getColValue = {
  run: (value, row, args = {}) => {
    if (!args.col) {
      throw new Error('Missing Arg col');
    }
    if (!row.hasOwnProperty(args.col)) {
      throw new Error('Invalid Arg col');
    }

    return row[args.col];
  }
};

module.exports = getColValue;
