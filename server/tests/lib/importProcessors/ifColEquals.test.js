const ifColEquals = require('../../../lib/importProcessors/ifColEquals');

describe('ifColEquals processor', () => {
  it('should throw error if "col" arg is missing', async () => {
    let err;
    try {
      ifColEquals.run(88, [88, 'S'], {});
    } catch (e) {
      err = e;
    }

    expect(err).toBeDefined();
    expect(err.message).toBeDefined();
    expect(err.message).toContain('Missing Arg');
  });

  it('should throw error if "equals" arg is missing', async () => {
    let err;
    try {
      ifColEquals.run(88, [88, 'S'], { col: 1 });
    } catch (e) {
      err = e;
    }

    expect(err).toBeDefined();
    expect(err.message).toBeDefined();
    expect(err.message).toContain('Missing Arg');
  });

  it('should throw error if "then" arg is missing', async () => {
    let err;
    try {
      ifColEquals.run(88, [88, 'S'], { col: 1, equals: 'S' });
    } catch (e) {
      err = e;
    }

    expect(err).toBeDefined();
    expect(err.message).toBeDefined();
    expect(err.message).toContain('Missing Arg');
  });

  it('should throw error for invalid "col"', async () => {
    let err;
    try {
      ifColEquals.run(88, [88, 'S'], { col: 4, equals: 'S', then: [] });
    } catch (e) {
      err = e;
    }

    expect(err).toBeDefined();
    expect(err.message).toBeDefined();
    expect(err.message).toContain('Invalid Arg');
  });

  it('should return orginal value if equals condition fails', async () => {
    const row = [88, 'S'];
    const runProcessors = jest.fn();

    const result = ifColEquals.run(88, row, { col: 1, equals: 'X', then: [] }, runProcessors);

    expect(runProcessors).not.toHaveBeenCalled();
    expect(result).toEqual(88);
  });

  it('should call runProcessors if equals condition passes', async () => {
    const row = [88, 'S'];
    const runProcessors = jest.fn();

    ifColEquals.run(88, row, { col: 1, equals: 'S', then: [] }, runProcessors);

    expect(runProcessors).toHaveBeenCalledTimes(1);
    expect(runProcessors).toHaveBeenLastCalledWith([], 88, row);
  });
});
