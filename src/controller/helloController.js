const packageInfo = require('../../package.json');

const helloController = (req, res) => {
  res.send( { now: new Date(), name: packageInfo.name, version: packageInfo.version } );
};

module.exports = helloController;
