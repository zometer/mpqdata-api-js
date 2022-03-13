const remoteConfig = require('./remoteConfig');
const log4js = require('log4js');

log4js.configure(remoteConfig.logging);
