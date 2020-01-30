const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const controllers = require('./controllers');
const models = require('./models');

const app = express();

app.use(cors());

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(controllers);

models.sequelize.sync({}).then(() => {
  app.listen(4000, () => {
    console.log('Server is running on port 4000');
  });
});

