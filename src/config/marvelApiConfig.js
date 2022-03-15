const config = require('./remoteConfig');

config.remoteApis.marvel.publicKey = process.env.MARVEL_API_PUBLICKEY;
config.remoteApis.marvel.privateKey = process.env.MARVEL_API_PRIVATEKEY;
