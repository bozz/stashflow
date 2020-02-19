/**
 * Apply simple mapping to input value (String assumed)
 * @param {*} value
 * @param {array} row
 * @param {object} args
 * @param {number} args.mapping - custom mapping
 * @returns {string}
 */
const applyMapping = {
  run: (value, row, args = {}) => {
    if (typeof args.mapping === 'undefined') {
      throw new Error('Missing Arg mapping');
    }

    if (typeof args.mapping !== 'object') {
      throw new Error('Invalid Arg mapping');
    }

    if (typeof value !== 'string') {
      return value;
    }

    if (!args.mapping.hasOwnProperty(value)) {
      return value;
    }

    return args.mapping[value];
  }
};

module.exports = applyMapping;
