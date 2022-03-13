const db = require('./db');
const remoteConfig = require('./remoteConfig');
require('./marvelApiConfig');
require('./logging');
const logger = require('log4js').getLogger('config');

const config = { db, ...remoteConfig };

config.remoteApis.mpq.deviceId = process.env.MPQ_API_DEVICEID;

logger.info('Configuration loaded.');
logger.trace('Configuration: ' + config);

module.exports = config;
