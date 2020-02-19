const splitAndSlice = require('../../../lib/importProcessors/splitAndSlice');

describe('splitAndSlice processor', () => {
  it('should throw error if "separator" arg is missing', async () => {
    let err;
    try {
      splitAndSlice.run('1;2;3;4', [], {});
    } catch (e) {
      err = e;
    }

    expect(err).toBeDefined();
    expect(err.message).toBeDefined();
    expect(err.message).toContain('Missing Arg');
  });

  it('should return original value if not a string', async () => {
    const nonString = 123;
    const result = splitAndSlice.run(nonString, [], { separator: ';' });

    expect(result).toEqual(nonString);
  });

  it('should split and join using "separator" if no other args', async () => {
    const value = '1;2;3;4';
    const result = splitAndSlice.run(value, [], { separator: ';' });

    expect(result).toEqual(value);
  });

  it('should slice using only "begin" arg', async () => {
    const value = '1;2;3;4';
    const result = splitAndSlice.run(value, [], { separator: ';', begin: 2 });

    expect(result).toEqual('3;4');
  });

  it('should slice with "begin" and "end" args', async () => {
    const value = '1;2;3;4';
    const result = splitAndSlice.run(value, [], { separator: ';', begin: 1, end: 3 });

    expect(result).toEqual('2;3');
  });

  it('should slice only first element', async () => {
    const value = '1;2;3;4';
    const result = splitAndSlice.run(value, [], { separator: ';', begin: 0, end: 1 });

    expect(result).toEqual('1');
  });

  it('should support "joinSeparator" arg', async () => {
    const value = '1;2;3;4';
    const result = splitAndSlice.run(value, [], {
      separator: ';',
      begin: 1,
      end: 3,
      joinSeparator: '-'
    });

    expect(result).toEqual('2-3');
  });
});
