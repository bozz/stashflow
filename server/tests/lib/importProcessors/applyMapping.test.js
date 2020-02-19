const applyMapping = require('../../../lib/importProcessors/applyMapping');

describe('applyMapping processor', () => {
  it('should throw error if "mapping" arg is missing', async () => {
    let err;
    try {
      applyMapping.run('dogs', [], {});
    } catch (e) {
      err = e;
    }

    expect(err).toBeDefined();
    expect(err.message).toBeDefined();
    expect(err.message).toContain('Missing Arg');
  });

  it('should throw error if "mapping" not an object', async () => {
    let err;
    try {
      applyMapping.run('dogs', [], { mapping: '' });
    } catch (e) {
      err = e;
    }

    expect(err).toBeDefined();
    expect(err.message).toBeDefined();
    expect(err.message).toContain('Invalid Arg');
  });

  it('should return original value if not a string', async () => {
    const nonString = 123;
    const result = applyMapping.run(nonString, [], { mapping: {} });

    expect(result).toEqual(nonString);
  });

  it('should return original value if not found in mapping', async () => {
    const result = applyMapping.run('dog', [], { mapping: { cat: 'animal' } });

    expect(result).toEqual('dog');
  });

  it('should apply mapping', async () => {
    const result = applyMapping.run('dog', [], {
      mapping: {
        dog: 'animal'
      }
    });

    expect(result).toEqual('animal');
  });
});
