const CharacterCover = require('../model/CharacterCover')

const CharacterCoverService = {
  fetchAll: async () => await CharacterCover.findAll()
}; 

module.exports = CharacterCoverService; 