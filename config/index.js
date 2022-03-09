const db = require('./db');
const remoteConfig = require('./remoteConfig');

const config = {db, ...remoteConfig};

config.remoteApis.mpq.deviceId = process.env.MPQ_API_DEVICEID;

console.log("configuration loaded\n", config);

module.exports = config;
