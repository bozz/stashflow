/**
 * Converts strings with float numbers using ',' as decimal seperator to
 * standard float (with '.' as seperator)
 */
const convertFloat = {
  run: value => {
    if (typeof value === 'string') {
      value = parseFloat(
        value
          .replace('.', '')
          .replace(',', '.')
          .replace(' ', '')
      );
    }

    return value;
  }
};

module.exports = convertFloat;
