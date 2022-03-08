const CharacterCoverService = require("../service/CharacterCoverService");

const characterCoverController = { 
  fetchAll: async (req, res) => { 
    let covers = await CharacterCoverService.fetchAll();
    res.send( covers );    
  }
}; 

module.exports = characterCoverController;