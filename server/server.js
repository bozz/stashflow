const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressGraphQL = require('express-graphql');
const graphQLTools = require('graphql-tools');
const mergeUtils = require('merge-graphql-schemas');

const models = require('./models');

const typeDefs = mergeUtils.mergeTypes(mergeUtils.fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeUtils.mergeResolvers(mergeUtils.fileLoader(path.join(__dirname, './resolvers')));

const schema = graphQLTools.makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();

app.use(cors());

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/graphiql', expressGraphQL({
  schema,
  graphiql: true,
  context: {
    models
  }
}));

app.use('/graphql', expressGraphQL({
  schema,
  context: {
    models
  }
}));

models.sequelize.sync({}).then(() => {
  app.listen(4000, () => {
    console.log('Server is running on port 4000');
  });
});

