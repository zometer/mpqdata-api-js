const package = require('../package.json')

const helloController = (req, res) => {
  res.send( {now: new Date(), name: package.name, version: package.version} );
}; 

module.exports = helloController;
