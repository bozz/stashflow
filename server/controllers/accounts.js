const express = require('express');
const router = express.Router();

const db = require('../models');

// return all accounts
router.get('/', function(req, res, next){
  db.Account.findAll()
    .then(accounts => {
      return res.json({
        accounts
      });
    })
    .catch(error => {
      console.log("ERROR: ", error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;

