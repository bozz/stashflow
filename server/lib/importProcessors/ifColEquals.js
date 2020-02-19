const ifColEquals = {
  run: (value, row, args = {}, runProcessors) => {
    if (!args.col) {
      throw new Error('Missing Arg col');
    }
    if (!args.equals) {
      throw new Error('Missing Arg equals');
    }
    if (!args.then) {
      throw new Error('Missing Arg then');
    }
    if (!row.hasOwnProperty(args.col)) {
      throw new Error('Invalid Arg col');
    }

    if (row[args.col] == args.equals) {
      return runProcessors(args.then, value, row);
    }

    return value;
  }
};

module.exports = ifColEquals;
