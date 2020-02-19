const negateNumber = {
  run: (value, args, row) => {
    if (typeof value === 'number') {
      return -value;
    }
    return value;
  }
};

module.exports = negateNumber;
