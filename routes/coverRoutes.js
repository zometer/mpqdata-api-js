const express = require('express');
const characterCoverController = require('../controller/characterCoverController');
const constants = require('./constants')
const router = express.Router(); 

const coverRoutes = (app) => { 
  router.get('/covers', characterCoverController.fetchAll); 
  app.use(constants.REST_API_PREFIX, router);
};

module.exports = coverRoutes;