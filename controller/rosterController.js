const MpqdataApiError = require("../error/MpqdataApiError");
const AllianceService = require("../service/AllianceService");
const PlayerService = require("../service/PlayerService");
const _ = require('lodash');

const rosterController = { 
  fetchByName: async (req, res, next) => { 
    PlayerService.fetchByDisplayPlayerByName(req.params.name)
      .then(player => res.send(player))
      .catch(e => next(e))
    ;
  }
}; 

module.exports = rosterController;