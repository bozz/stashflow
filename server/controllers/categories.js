const express = require('express');
const router = express.Router();

const db = require('../models');

// return all categories
router.get('/', function(req, res, next){
  db.Category.findAll()
    .then(categories => {
      return res.json({
        categories
      });
    })
    .catch(error => {
      console.log("ERROR: ", error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;

