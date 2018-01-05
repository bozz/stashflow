const express = require('express');
const router = express.Router();

router.use('/transactions', require('./transactions'));

module.exports = router;

