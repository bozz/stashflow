const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const routers = require('./routers');
const db = require('./lib/db');

const app = express();

// replace standard query parser, return raw query string (use URLSearchParams)
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
    console.log('Server is running on port 4000');
  });
});
