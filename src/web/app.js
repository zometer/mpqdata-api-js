const express = require('express');
const app = express();
const applyRoutes = require('../routes');

applyRoutes(app);

/* Error Handling */
app.use('/api/rest/*', (error, req, res, next) => {
  const err = { error: error.name, message: error.message };
  if (process.env.NODE_ENV !== 'production') {
    err.stack = error.stack;
  }
  console.error(error);
  res.status(500);
  res.send(err);
});

module.exports = app;
