const packageInfo = require('../../package.json');
const logger = require('log4js').getLogger('HelloService');

const hello = () => {
  const out = { now: new Date(), name: packageInfo.name, version: packageInfo.version };
  logger.info( out );
  return out;
};

module.exports = { hello };
