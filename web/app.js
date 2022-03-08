const express = require('express');
const app = express();
const applyRoutes = require('../routes');

applyRoutes(app);

module.exports = app; 