const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routers = require('./routers');
const models = require('./models');

const app = express();

app.use(cors());

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routers);

models.sequelize.sync({}).then(() => {
  app.listen(4000, () => {
    console.log('Server is running on port 4000');
  });
});

