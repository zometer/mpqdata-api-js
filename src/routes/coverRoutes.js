const express = require('express');
const characterCoverController = require('../controller/characterCoverController');
const constants = require('./constants');
const router = express.Router();

const coverRoutes = (app) => {
  router.get('/covers', characterCoverController.fetchAll);
  router.get('/covers/unprocessed', characterCoverController.fetchUnprocessed);
  app.use(constants.REST_API_PREFIX, router);
};

module.exports = coverRoutes;
