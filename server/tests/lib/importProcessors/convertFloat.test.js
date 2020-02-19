const convertFloat = require('../../../lib/importProcessors/convertFloat');

describe('convertFloat processor', () => {
  it('should return original value if not a string', async () => {
    const nonString = 123;
    const result = convertFloat.run(nonString);

    expect(result).toEqual(nonString);
  });

  it('should convert string to float', async () => {
    const result = convertFloat.run('12,50');

    expect(result).toEqual(12.5);
  });
});
