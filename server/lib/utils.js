// const Op = require('sequelize').Op;

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

  convertQueryParamsToFindAll: req => {
    // TODO: fix sorting by category and account (causes crash...)

    // const limit = req.query.pageSize || 20;

    // // handle sort order
    // let order = [];
    // if (req.query.sorted) {
    //   const sorted = req.query.sorted || [];
    //   order = sorted.map(item => {
    //     const sort = JSON.parse(item);
    //     return [sort.id, sort.desc ? 'DESC' : 'ASC'];
    //   });
    // }

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

    // const page = req.query.page || 0;
    // const offset = limit * page;
    return {};
  }
};

module.exports = utils;
