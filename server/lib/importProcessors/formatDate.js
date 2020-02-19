const parse = require('date-fns/parse');
const format = require('date-fns/format');

const formatDate = {
  /** database target format */
  targetFormat: 'yyyy-MM-dd',

  /**
   * @param {*} value
   * @param {array} row
   * @param {object} args
   * @param {string} args.format - format of input date string
   * @param {function} runProcessors - callback for running nested processors
   * @returns {string} returns formatted date string
   */
  run: (value, row, args = {}) => {
    if (!args.format) {
      throw new Error('Missing Arg');
    }
    if (typeof args.format !== 'string') {
      throw new Error('Invalid Arg');
    }

    const parsedDate = parse(value, args.format, new Date());

    return format(parsedDate, formatDate.targetFormat);
  }
};

module.exports = formatDate;
