const { fetchUnprocessed } = require("../service/CharacterCoverService");
const CharacterCoverService = require("../service/CharacterCoverService");

const characterCoverController = { 
  fetchAll: async (req, res) => { 
    let covers = await CharacterCoverService.fetchAll();
    res.send( covers );    
  },
  fetchUnprocessed: async (req, res) => { 
    let covers = await CharacterCoverService.fetchUnprocessed();
    res.send(covers);
  }
}; 

module.exports = characterCoverController;