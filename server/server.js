const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const routers = require('./routers');
const db = require('./lib/db');
const logger = require('./lib/logger');

const app = express();

// replace standard query parser, return raw query string (use URLSearchParams instead)
app.set('query parser', queryString => queryString);

app.use(cors());
app.use(helmet());

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routers);

db.init({
  dbConfig: {
    dialect: 'sqlite',
    storage: './data/stashflow.db',
    logging: false
  }
}).then(() => {
  app.listen(4000, () => {
    logger.info('Server is running on port 4000');
  });
});
