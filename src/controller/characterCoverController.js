const CharacterCoverService = require('../service/CharacterCoverService');

const characterCoverController = {
  fetchAll: async (req, res) => {
    const covers = await CharacterCoverService.fetchAll();
    res.send( covers );
  },
  fetchUnprocessed: async (req, res) => {
    const covers = await CharacterCoverService.fetchUnprocessed();
    res.send(covers);
  }
};

module.exports = characterCoverController;
