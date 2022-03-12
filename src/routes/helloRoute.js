const express = require('express');
const helloController = require('../controller/helloController');
const constants = require('./constants')
const router = express.Router(); 

const helloRoutes = (app) => { 
  router.get("/hello", helloController); 
  app.use(constants.REST_API_PREFIX, router);
}; 

module.exports = helloRoutes;
