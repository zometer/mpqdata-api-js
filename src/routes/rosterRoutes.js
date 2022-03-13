const express = require('express');
const rosterController = require('../controller/rosterController');
const constants = require('./constants');
const router = express.Router();

const rosterRoutes = (app) => {
  router.get('/rosters/:name', rosterController.fetchByName);
  app.use(constants.REST_API_PREFIX, router);
};

module.exports = rosterRoutes;
