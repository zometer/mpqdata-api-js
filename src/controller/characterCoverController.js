const CharacterCoverService = require('../service/CharacterCoverService');

const characterCoverController = {
  fetchAll: async (req, res) => {
    const covers = await CharacterCoverService.fetchAll();
    res.send( covers );
  },
  fetchById: async (req, res) => {
    const id = req.params.id;
    const cover = await CharacterCoverService.fetchById(id);
    res.send( cover );
  },
  fetchUnprocessed: async (req, res) => {
    const covers = await CharacterCoverService.fetchUnprocessed();
    res.send(covers);
  },
  searchCoverImages: async (req, res) => {
    const searchRequest = req.body;
    const results = await CharacterCoverService.searchCoverImages(searchRequest);
    res.send(results);
  },
  updateCover: async (req, res, next) => {
    const cover = req.body;
    CharacterCoverService.updateCover(cover)
      .then(result => res.send(result))
      .catch(next)
    ;
  }
};

module.exports = characterCoverController;
