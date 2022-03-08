const express = require('express');
const app = express();
const package = require('../package.json')

app.get('/api/rest/v1/hello', (req, res) => { 
  res.send({now: new Date(), name: package.name, version: package.version});
});

module.exports = app; 