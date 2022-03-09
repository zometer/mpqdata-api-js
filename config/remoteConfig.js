const fetch = require('sync-fetch');
const YAML = require('yaml');
const token = process.env.GITHUB_API_TOKEN; 
const configUrl = process.env.CONFIG_URL;

const remoteYaml = fetch(configUrl, {
  headers: { 
    "Accept": "application/vnd.github.v3.raw", 
    "Authorization": `bearer ${token}`
  }
}).text(); 

const remoteConfig = YAML.parse(remoteYaml); 

console.log("remoteConfig\n", remoteConfig);

module.exports = remoteConfig;