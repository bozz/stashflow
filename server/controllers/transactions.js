const express = require('express');
const router = express.Router();

// const log = require('./../lib/logger').errorLog;
// const cfg = require('config');

const models = require('../models');


// should extra infos (i.e. SQL query) be displayed in errors
// const verboseApiErrors = cfg.get('dcf.verboseApiErrors');

// return all transactions
router.get('/', function(req, res, next){

  // TODO: handle pagination, filtering, sorting...

  models.Transaction.findAll().then(transactions => {
    return res.json({
      transactions
    });
  }).catch(next);
});


// return specific transaction
router.get('/:id', function(req, res, next){
  models.Transaction.findOne({ where: { id: req.params.id } }).then(transaction => {
    if (!transaction) {
      return res.status(404).json({
        error: "Transaction not found"
      });
    }
    return res.json(transaction);
  }).catch(next);
});

module.exports = router;

