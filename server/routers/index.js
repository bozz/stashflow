const express = require('express');
const router = express.Router();

router.use('/accounts', require('./accounts'));
router.use('/categories', require('./categories'));
router.use('/transactions', require('./transactions'));

module.exports = router;

