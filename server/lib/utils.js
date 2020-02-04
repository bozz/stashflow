const Op = require('sequelize').Op;

const utils = {
  /**
   * Format router error responses.
   * @param {Response} res
   * @param {Error} error
   * @returns {Response}
   */
  formatErrorResponse: (res, error) => {
    // TODO: handle errors more intelligently
    console.error(error);
    return res.status(500).json({
      status: 500,
      error: error.name,
      message: error.message
    });
  },

  /**
   * Convert request query params to options for Sequelize findAll
   * @param {URLSearchParams} params
   * @param {Number} params.page
   * @param {Number} params.pageSize
   * @param {String} params.sortBy
   * @param {Object} modelAttributes - model attributes and their types
   * @param {Object} config
   * @param {Array} config.queryFilter
   * @returns {Object}
   */
  generateFindAllOptions: async (searchParams, modelAttributes, config = {}) => {
    const resultOptions = {};

    if (!(searchParams instanceof URLSearchParams)) {
      throw new Error('generateFindAllOptions: Invalid params');
    }

    // PAGINATION ::::::::::::::::::::::::::::::::::::::::

    const page = searchParams.has('page') ? parseInt(searchParams.get('page'), 10) : 1;
    const pageSize = searchParams.has('pageSize')
      ? parseInt(searchParams.get('pageSize'), 10)
      : undefined;

    if (!pageSize || pageSize > 0) {
      resultOptions.limit = pageSize || 20;
      resultOptions.offset = resultOptions.limit * Math.max(0, page - 1);
    }

    // SORTING ::::::::::::::::::::::::::::::::::::::::

    const sortBy = searchParams.getAll('sortBy');

    if (!sortBy.length) {
      sortBy.push('id:desc'); // default order if nothing specified
    }

    resultOptions.order = sortBy.reduce((result, item) => {
      let [sortName, sortDir] = item.split(':');

      if (!modelAttributes.hasOwnProperty(sortName)) {
        return result;
      }

      sortDir = sortDir ? sortDir.toUpperCase() : undefined;
      if (!['ASC', 'DESC'].includes(sortDir)) {
        sortDir = 'ASC';
      }
      result.push([sortName, sortDir]);

      return result;
    }, []);

    // FILTERING ::::::::::::::::::::::::::::::::::::::

    const where = {};

    // handle special query filter 'q' parameter
    if (config.queryFilter && config.queryFilter.length && searchParams.has('q')) {
      const q = searchParams.get('q');
      const queryFilterColumns = [];
      config.queryFilter.forEach(filter => {
        queryFilterColumns.push({ [filter]: { [Op.like]: '%' + q + '%' } });

        // remove searchParams if used in queryFilter
        if (searchParams.has(filter)) {
          searchParams.delete(filter);
        }
      });

      where[Op.or] = queryFilterColumns;
    }

    // searchParams with special meaning, cannot be used as filters
    const blacklist = ['page', 'pagesize', 'sortby', 'q'];
    for (let [key, value] of searchParams.entries()) {
      if (modelAttributes.hasOwnProperty(key) && !blacklist.includes(key.toLowerCase())) {
        where[key] = utils.formatValueByDbType(value, modelAttributes[key].type);
      }
    }

    if (Reflect.ownKeys(where).length) {
      resultOptions.where = where;
    }

    // // handle basic filtering (TODO: add support for date ranges)
    // let filter = {};
    // if (req.query.filtered) {
    //   const filtered = req.query.filtered || [];
    //   filtered.forEach(item => {
    //     const filterItem = JSON.parse(item);
    //     if (filterItem.query) {
    //       filter[Op.or] = [
    //         { name: { $like: '%' + filterItem.query + '%' } },
    //         { description: { $like: '%' + filterItem.query + '%' } }
    //       ];
    //     } else {
    //       Object.assign(filter, filterItem);
    //     }
    //   });
    // }
    // db.Transaction.findAndCountAll({
    //   where: filter,
    //   include: [{ model: db.Category, as: 'category', attributes: ['name'] }],
    //   limit,
    //   offset,
    //   order
    // })
    //   .then(data => {
    //     return res.json({
    //       data: data.rows,
    //       count: data.count,
    //       pages: Math.ceil(data.count / limit)
    //     });
    //   })
    //   .catch(err => formatErrorResponse(res, err));

    return resultOptions;
  },

  formatValueByDbType: (value, type) => {
    switch (type) {
      case 'INTEGER':
        return parseInt(value, 10);
      case 'TEXT':
      case 'DATETIME':
        return value;
      default:
        return value;
    }
  }
};

module.exports = utils;
