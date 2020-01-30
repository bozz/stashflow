const express = require('express');
const router = express.Router();
const Op = require('sequelize').Op;

const db = require('../models');
const formatErrorResponse = require('../lib/utils').formatErrorResponse;

// return all transactions
router.get('/', function(req, res) {
  // TODO: fix sorting by category and account (causes crash...)

  const limit = req.query.pageSize || 20;

  // handle sort order
  let order = [];
  if (req.query.sorted) {
    const sorted = req.query.sorted || [];
    order = sorted.map(item => {
      const sort = JSON.parse(item);
      return [sort.id, sort.desc ? 'DESC' : 'ASC'];
    });
  }

  // handle basic filtering (TODO: add support for date ranges)
  let filter = {};
  if (req.query.filtered) {
    const filtered = req.query.filtered || [];
    filtered.forEach(item => {
      const filterItem = JSON.parse(item);
      if (filterItem.query) {
        filter[Op.or] = [
          { name: { $like: '%' + filterItem.query + '%' } },
          { description: { $like: '%' + filterItem.query + '%' } }
        ];
      } else {
        Object.assign(filter, filterItem);
      }
    });
  }

  const page = req.query.page || 0;
  const offset = limit * page;

  db.Transaction.findAndCountAll({
    where: filter,
    include: [{ model: db.Category, as: 'category', attributes: ['name'] }],
    limit,
    offset,
    order
  })
    .then(data => {
      return res.json({
        data: data.rows,
        count: data.count,
        pages: Math.ceil(data.count / limit)
      });
    })
    .catch(err => formatErrorResponse(res, err));
});

// return specific transaction
router.get('/:id', function(req, res) {
  db.Transaction.findByPk(req.params.id)
    .then(instance => {
      if (!instance) {
        throw new Error('Transaction Not Found');
      }
      return res.json(instance);
    })
    .catch(err => formatErrorResponse(res, err));
});

// create transaction
router.post('/', function(req, res) {
  db.Transaction.create(req.body, {
    fields: ['accountId', 'type', 'categoryId', 'date', 'amount', 'name', 'description']
  })
    .then(instance => res.json(instance))
    .catch(err => formatErrorResponse(res, err));
});

// update transaction
router.post('/:id', function(req, res) {
  db.Transaction.findByPk(req.params.id)
    .then(instance => {
      if (!instance) {
        throw new Error('Transaction Not Found');
      }
      return instance.update(req.body);
    })
    .then(instance => res.json(instance))
    .catch(err => formatErrorResponse(res, err));
});

// delete specific transaction
router.delete('/:id', function(req, res, next) {
  db.Transaction.findByPk(req.params.id)
    .then(instance => {
      if (!instance) {
        throw new Error('Transaction Not Found');
      }
      return instance.destroy();
    })
    .then(result => res.json({ success: !!result }))
    .catch(err => formatErrorResponse(res, err));
});

module.exports = router;
