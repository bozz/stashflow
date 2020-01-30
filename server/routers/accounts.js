const express = require('express');
const router = express.Router();

const db = require('../models');
const formatErrorResponse = require('../lib/utils').formatErrorResponse;


// return all accounts
router.get('/', function(req, res){
  db.Account.findAll()
    .then(accounts => res.json({ data: accounts }))
    .catch(error => formatErrorResponse(res, error));
});

// return specific account
router.get('/:id', function(req, res){
  db.Account.findByPk(req.params.id)
    .then(account => {
      if (!account) {
        throw new Error('Account Not Found')
      }
      return res.json(account)
    })
    .catch(err => formatErrorResponse(res, err));
});

// create account
router.post('/', function(req, res) {
  db.Account.create(req.body)
    .then(instance => res.json(instance))
    .catch(err => formatErrorResponse(res, err));
});

// update account
router.post('/:id', function(req, res) {
  db.Account.findByPk(req.params.id)
    .then(instance => {
      if (!instance) {
        throw new Error('Account Not Found');
      }
      return instance.update(req.body);
    })
    .then(instance => res.json(instance))
    .catch(err => formatErrorResponse(res, err));
});

// delete account
router.delete('/:id', function(req, res) {
  db.Account.findByPk(req.params.id)
    .then(instance => {
      if (!instance) {
        throw new Error('Account Not Found');
      }
      return instance.destroy();
    })
    .then(result => res.json({ success: !!result }))
    .catch(err => formatErrorResponse(res, err));
});


module.exports = router;

