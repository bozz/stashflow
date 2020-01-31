const express = require('express');
const router = express.Router();

const applyCrudRoutes = require('../lib/applyCrudRoutes');

applyCrudRoutes(router, 'Account');

module.exports = router;
