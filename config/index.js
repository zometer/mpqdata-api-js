const fetch = require('sync-fetch');
const YAML = require('yaml');
const token = process.env.GITHUB_API_TOKEN; 
const configUrl = process.env.CONFIG_URL;

const config = {
  db: {
    url: process.env.DB_URL,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  }
};


const remoteYaml = fetch(configUrl, {
  headers: { 
    "Accept": "application/vnd.github.v3.raw", 
    "Authorization": `bearer ${token}`
  }
}).text(); 

const remoteConfig = YAML.parse(remoteYaml); 
Object.assign(config, remoteConfig);
config.remoteApis.mpq.deviceId = process.env.MPQ_API_DEVICEID;

module.exports = config;
