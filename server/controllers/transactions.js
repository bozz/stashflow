const express = require('express');
const router = express.Router();

// const log = require('./../lib/logger').errorLog;
// const cfg = require('config');

const db = require('../models');


// should extra infos (i.e. SQL query) be displayed in errors
// const verboseApiErrors = cfg.get('dcf.verboseApiErrors');

// return all transactions
router.get('/', function(req, res, next){

  // TODO: handle filtering...

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

  db.Transaction.findAndCountAll()
    .then((data) => {
      const page = req.query.page || 0;
      const pages = Math.ceil(data.count / limit);
      const offset = limit * page;

      db.Transaction.findAll({
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

module.exports = router;

