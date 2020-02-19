const formatDate = require('../../../lib/importProcessors/formatDate');

describe('formatDate processor', () => {
  it('should throw error if "format" arg is missing', async () => {
    let err;
    try {
      formatDate.run('02.01.2020', [], {});
    } catch (e) {
      err = e;
    }

    expect(err).toBeDefined();
    expect(err.message).toBeDefined();
    expect(err.message).toContain('Missing Arg');
  });

  it('should throw error if "format" arg not a string', async () => {
    let err;
    try {
      formatDate.run('02.01.2020', [], { format: 123 });
    } catch (e) {
      err = e;
    }

    expect(err).toBeDefined();
    expect(err.message).toBeDefined();
    expect(err.message).toContain('Invalid Arg');
  });

  it('should produce correct date format with valid config', async () => {
    const result = formatDate.run('02.01.2020', [], { format: 'dd.MM.yyyy' });

    expect(result).toEqual('2020-01-02');
  });
});
