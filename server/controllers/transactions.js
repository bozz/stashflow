const express = require('express');
const router = express.Router();

// const log = require('./../lib/logger').errorLog;
// const cfg = require('config');

const db = require('../models');


// should extra infos (i.e. SQL query) be displayed in errors
// const verboseApiErrors = cfg.get('dcf.verboseApiErrors');

// return all transactions
router.get('/', function(req, res, next){

  // TODO: fix sorting by category and account (causes crash...)

  const limit = req.query.pageSize || 20;

  // handle sort order
  let order = [];
  if (req.query.sorted) {
    const sorted = req.query.sorted || [];
    order = sorted.map(item => {
      const sort = JSON.parse(item);
      return [sort.id, sort.desc ? 'DESC' : 'ASC']
    });
  }

  // handle basic filtering (TODO: add support for date ranges)
  let filter = {};
  if (req.query.filtered) {
    const filtered = req.query.filtered || [];
    filtered.forEach(item => {
      Object.assign(filter, JSON.parse(item));
    });
  }

  db.Transaction.findAndCountAll({ where: filter })
    .then((data) => {
      const page = req.query.page || 0;
      const pages = Math.ceil(data.count / limit);
      const offset = limit * page;

      db.Transaction.findAll({
        include: [
          { model: db.Category, as: 'category', attributes: ['name'] }
        ],
        where: filter,
        limit,
        offset,
        order
      }).then(transactions => {
        return res.json({
          transactions,
          count: data.count,
          pages
        });
      }).catch(next);
    }).catch(function(error) {
      console.log("ERROR: ", error);
      res.status(500).send('Internal Server Error');
    });
});


// return specific transaction
router.get('/:id', function(req, res, next){
  db.Transaction.findOne({ where: { id: req.params.id } }).then(transaction => {
    if (!transaction) {
      return res.status(404).json({
        error: "Transaction not found"
      });
    }
    return res.json(transaction);
  }).catch(next);
});

// create new transaction
router.post('/', function(req, res, next){
  db.Transaction.create(req.body, {
    fields: ['accountId', 'type', 'categoryId', 'date', 'amount', 'name', 'description']
  }).then((transaction) => {
    return res.json(transaction);
  }).catch(next);
});

// update specific transaction
router.post('/:id', function(req, res, next){
  db.Transaction.findOne({ where: { id: req.params.id } }).then(transaction => {
    if (!transaction) {
      return res.status(404).json({
        error: "Transaction not found"
      });
    }
    transaction.update(req.body, {
      fields: ['accountId', 'type', 'categoryId', 'date', 'amount', 'name', 'description']
    }).then(() => {
      return res.json(req.body);
    });
  }).catch(next);
});

// delete specific transaction
router.delete('/:id', function(req, res, next){
  db.Transaction.findOne({ where: { id: req.params.id } })
    .then(transaction => {
      if (!transaction) {
        return res.status(404).json({
          error: "Transaction not found"
        });
      }
      return transaction.destroy();
    })
    .then(() => {
      return res.json({ success: true });
    }).catch(next);
});

module.exports = router;

