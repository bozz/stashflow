const negateNumber = require('../../../lib/importProcessors/negateNumber');

describe('negateNumber processor', () => {
  it('should return original value if not numeric', async () => {
    const nonNumeric = 'abc';
    const result = negateNumber.run(nonNumeric);

    expect(result).toEqual(nonNumeric);
  });

  it('should negate number', async () => {
    const result = negateNumber.run(12.5);

    expect(result).toEqual(-12.5);
  });
});
