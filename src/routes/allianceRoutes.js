const express = require('express');
const allianceController = require('../controller/allianceController');
const constants = require('./constants')
const router = express.Router(); 

const allianceRoutes = (app) => { 
  router.get('/alliances/:name', allianceController.fetchByName); 
  router.get('/alliances/guid/:guid', allianceController.fetchByGuid);
  router.get('/search/alliances/', allianceController.search);
  app.use(constants.REST_API_PREFIX, router);
};

module.exports = allianceRoutes;
