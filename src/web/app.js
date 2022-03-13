const express = require('express');
const app = express();
const applyRoutes = require('../routes');
const logger = require('log4js').getLogger('web.app');
const cors = require('cors');

app.use(express.json());

/* cors */
app.use(cors({ origin: '*' }));

applyRoutes(app);

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
