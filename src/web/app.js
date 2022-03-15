const express = require('express');
const app = express();
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const logger = require('log4js').getLogger('web.app');
const applyRoutes = require('../routes');
const graphqlOptions = require('../graphql');

app.use(express.json());

/* cors */
app.use(cors({ origin: '*' }));

applyRoutes(app);

/* GraphQL */
logger.debug({ graphqlOptions });
app.use('/api/graphql', graphqlHTTP(graphqlOptions));
logger.info('graphql api started');

/* Error Handling */
app.use('/api/rest/*', (error, req, res, next) => {
  const err = { error: error.name, message: error.message };
  if (process.env.NODE_ENV !== 'production') {
    err.stack = error.stack;
  }
  logger.error(error);
  res.status(500);
  res.send(err);
});

module.exports = app;
