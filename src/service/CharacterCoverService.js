const CharacterCover = require('../model/CharacterCover');
const logger = require('log4js').getLogger('CharacterCoverService');
const MarvelApiClient = require('../remoteApis/MarvelApiClient');
const GcdApiClient = require('../remoteApis/GcdApiClient');

const CharacterCoverService = {
  fetchAll: async () => await CharacterCover.findAll(),
  fetchById: async (id) => await CharacterCover.findByPk(id),
  fetchUnprocessed: async () => await CharacterCover.findAll( { where: { complete: false } } ),
  searchCoverImages: async (searchParams) => {
    logger.debug('searchParams', searchParams);
    const results = await searchMarvelCovers(searchParams);
    const gcdResults = await searchGcdCovers(searchParams);
    return results.concat(gcdResults);
  }
};

const searchMarvelCovers = async (params) => {
  const results = await MarvelApiClient.queryForImages(params);
  logger.debug('MarvelApiClient.response', results);
  return results;
};

const searchGcdCovers = async (params) => {
  const results = await GcdApiClient.queryForImages(params);
  logger.debug('GcdApiClient.response', results);
  return results;
};

module.exports = CharacterCoverService;
