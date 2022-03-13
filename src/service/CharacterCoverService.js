const CharacterCover = require('../model/CharacterCover');
const logger = require('log4js').getLogger('CharacterCoverService');
const MarvelApiClient = require('../remoteApis/MarvelApiClient');

const CharacterCoverService = {
  fetchAll: async () => await CharacterCover.findAll(),
  fetchById: async (id) => await CharacterCover.findByPk(id),
  fetchUnprocessed: async () => await CharacterCover.findAll( { where: { complete: false } } ),
  searchCoverImages: async (searchParams) => {
    logger.debug('searchParams', searchParams);
    const results = searchMarvelCovers(searchParams);
    return results;
  }
};

const searchMarvelCovers = async (params) => {
  const results = await MarvelApiClient.queryForImages(params);
  logger.debug('response', results);
  return results;
};

module.exports = CharacterCoverService;
