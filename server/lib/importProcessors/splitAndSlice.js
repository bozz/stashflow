/**
 * Returns the value of specified column (ignores input value)
 * @param {*} value
 * @param {array} row
 * @param {object} args
 * @param {number} args.separator - split separator
 * @param {number} [args.begin] - slice begin index
 * @param {number} [args.end] - slice end index
 * @param {number} [args.joinSeparator] - separator for join (defaults to split separator)
 */
const splitAndSlice = {
  run: (value, row, args = {}) => {
    if (!args.separator) {
      throw new Error('Missing Arg separator');
    }
    if (typeof value !== 'string') {
      return value;
    }

    let arrayData = value.split(args.separator);

    if (typeof args.begin !== undefined) {
      arrayData = arrayData.slice(args.begin, args.end);
    }

    const result = arrayData.join(args.joinSeparator || args.separator);

    return result;
  }
};

module.exports = splitAndSlice;
