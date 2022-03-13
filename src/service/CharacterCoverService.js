const CharacterCover = require('../model/CharacterCover');

const CharacterCoverService = {
  fetchAll: async () => await CharacterCover.findAll(),
  fetchUnprocessed: async () => await CharacterCover.findAll( { where: { complete: false } } )
};

module.exports = CharacterCoverService;
