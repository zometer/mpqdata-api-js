require('dotenv').config();
require('./config');
const logger = require('log4js').getLogger('ApplicationRoot');
logger.info(`Starting application.`);
require('./web/server');
