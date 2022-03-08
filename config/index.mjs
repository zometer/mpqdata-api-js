import fetch from 'node-fetch';
import YAML from 'yaml';
import db from './db.js';

const token = process.env.GITHUB_API_TOKEN;
const configUrl = process.env.CONFIG_URL; 

const remoteConfig = await fetch(configUrl, {
  headers: { 
    "Accept": "application/vnd.github.VERSION.raw",
    "Authorization": `bearer ${token}`
  }
})
  .then(res => res.text())
  .then(text => YAML.parse(text))
  .catch(e => console.log(`Error loading config: ${e}`))
;

const config = { 
  ...remoteConfig,
  db
}; 
config.remoteApis.mpq.deviceId = process.env.MPQ_DEVICE_ID;

export default config;
