const Op = require('sequelize').Op;
const generateFindAllOptions = require('../../../lib/utils').generateFindAllOptions;

const attrs = {
  id: { type: 'INTEGER' },
  name: { type: 'VARCHAR(255)' },
  description: { type: 'TEXT' },
  categoryId: { type: 'INTEGER' },
  amount: { type: 'DECIMAL(10,2)' },
  createdAt: { type: 'DATETIME' }
};

describe('utils - generateFindAllOptions', () => {
  it('should throw error if no params passed', async () => {
    let err;
    try {
      await generateFindAllOptions();
    } catch (e) {
      err = e;
    }

    expect(err).toBeDefined();
    expect(err.message).toBeDefined();
    expect(err.message).toContain('Invalid');
  });

  it('should return default options when empty params passed', async () => {
    const searchParams = new URLSearchParams();
    const options = await generateFindAllOptions(searchParams, attrs);
    expect(options).toEqual({
      offset: 0,
      limit: 20,
      order: [['id', 'DESC']]
    });
  });

  describe('handling pagination', () => {
    it('should accept "pageSize" param', async () => {
      let searchParams = new URLSearchParams('pageSize=0');
      let options = await generateFindAllOptions(searchParams, attrs);
      expect(options).toEqual(expect.objectContaining({ offset: 0, limit: 20 })); // ==> defaults

      searchParams = new URLSearchParams('pageSize=10');
      options = await generateFindAllOptions(searchParams, attrs);
      expect(options).toEqual(expect.objectContaining({ offset: 0, limit: 10 }));
    });

    it('should handle pageSize < 0 by removing offset and limit', async () => {
      const searchParams = new URLSearchParams('pageSize=-1');
      const options = await generateFindAllOptions(searchParams, attrs);
      expect(options.offset).not.toBeDefined();
      expect(options.limit).not.toBeDefined();
    });

    it('should accept "page" param', async () => {
      const searchParams = new URLSearchParams('page=2');
      const options = await generateFindAllOptions(searchParams, attrs);
      expect(options).toEqual(expect.objectContaining({ offset: 20, limit: 20 }));
    });

    it('should handle page < 1 as first page', async () => {
      let searchParams = new URLSearchParams('page=0');
      let options = await generateFindAllOptions(searchParams, attrs);
      expect(options).toEqual(expect.objectContaining({ offset: 0, limit: 20 }));

      searchParams = new URLSearchParams('page=-1');
      options = await generateFindAllOptions(searchParams, attrs);
      expect(options).toEqual(expect.objectContaining({ offset: 0, limit: 20 }));
    });
  });

  describe('handling sorting', () => {
    it('should accept single "sortBy" param and apply default sort direction', async () => {
      const searchParams = new URLSearchParams('sortBy=name');
      const options = await generateFindAllOptions(searchParams, attrs);
      expect(options).toEqual(
        expect.objectContaining({
          order: [['name', 'ASC']]
        })
      );
    });

    it('should accept single "sortBy" param and apply DESC sort direction', async () => {
      const searchParams = new URLSearchParams('sortBy=name:desc');
      const options = await generateFindAllOptions(searchParams, attrs);
      expect(options).toEqual(
        expect.objectContaining({
          order: [['name', 'DESC']]
        })
      );
    });

    it('should accept single "sortBy" param and apply ASC sort direction', async () => {
      const searchParams = new URLSearchParams('sortBy=name:asc');
      const options = await generateFindAllOptions(searchParams, attrs);
      expect(options).toEqual(
        expect.objectContaining({
          order: [['name', 'ASC']]
        })
      );
    });

    it('should ignore invalid "sortBy" params', async () => {
      const searchParams = new URLSearchParams('sortBy=foo:asc&sortBy=name&sortBy=soso:desc');
      const options = await generateFindAllOptions(searchParams, attrs);
      expect(options).toEqual(
        expect.objectContaining({
          order: [['name', 'ASC']]
        })
      );
    });

    it('should use default sort direction for invalid specifier', async () => {
      const searchParams = new URLSearchParams('sortBy=name:invalidSpecifier');
      const options = await generateFindAllOptions(searchParams, attrs);
      expect(options).toEqual(
        expect.objectContaining({
          order: [['name', 'ASC']]
        })
      );
    });

    it('should accept multiple "sortBy" params', async () => {
      const searchParams = new URLSearchParams('sortBy=name&sortBy=createdAt:desc');
      const options = await generateFindAllOptions(searchParams, attrs);
      expect(options).toEqual(
        expect.objectContaining({
          order: [
            ['name', 'ASC'],
            ['createdAt', 'DESC']
          ]
        })
      );
    });
  });

  describe('handling filtering', () => {
    it('should accept single filter for exact match', async () => {
      const searchParams = new URLSearchParams('name=foo');
      const options = await generateFindAllOptions(searchParams, attrs);
      expect(options).toEqual(
        expect.objectContaining({
          where: { name: 'foo' }
        })
      );
    });

    it('should accept multiple filters for exact matches', async () => {
      const searchParams = new URLSearchParams('name=foo&description=alpha');
      const options = await generateFindAllOptions(searchParams, attrs);
      expect(options).toEqual(
        expect.objectContaining({
          where: { name: 'foo', description: 'alpha' }
        })
      );
    });

    it('should convert numeric filter values to numbers', async () => {
      const searchParams = new URLSearchParams('categoryId=23');
      const options = await generateFindAllOptions(searchParams, attrs);
      expect(options).toEqual(
        expect.objectContaining({
          where: { categoryId: 23 }
        })
      );
    });

    it('should ignore filters that are not within modelAttributes', async () => {
      const searchParams = new URLSearchParams('foo=bar');
      const options = await generateFindAllOptions(searchParams, attrs);
      expect(options).toEqual(
        expect.not.objectContaining({
          where: expect.any(Object)
        })
      );
    });

    it('should handle queryFilter q if defined', async () => {
      const searchParams = new URLSearchParams('q=foo');
      const options = await generateFindAllOptions(searchParams, attrs, {
        queryFilter: ['name', 'description']
      });

      const where = options.where;
      expect(where).toBeDefined();
      expect(Reflect.ownKeys(where)).toHaveLength(1);
      expect(where[Op.or]).toBeDefined();
      expect(where[Op.or]).toHaveLength(2);
      expect(where[Op.or][0].name).toBeDefined();
      expect(where[Op.or][0].name[Op.like]).toBeDefined();
      expect(where[Op.or][0].name[Op.like]).toEqual('%foo%');
      expect(where[Op.or][1].description).toBeDefined();
      expect(where[Op.or][1].description[Op.like]).toBeDefined();
      expect(where[Op.or][1].description[Op.like]).toEqual('%foo%');
    });

    it('should ignore normal filters for columns used in queryFilter', async () => {
      const searchParams = new URLSearchParams('q=foo&name=gogo&categoryId=23');
      const options = await generateFindAllOptions(searchParams, attrs, {
        queryFilter: ['name', 'description']
      });

      const where = options.where;
      expect(where).toBeDefined();
      expect(Reflect.ownKeys(where)).toHaveLength(2);
      expect(where[Op.or]).toBeDefined();
      expect(where[Op.or]).toHaveLength(2);
      expect(where.categoryId).toEqual(23);
    });
  });
});
