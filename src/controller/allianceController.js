const MpqdataApiError = require('../error/MpqdataApiError');
const AllianceService = require('../service/AllianceService');
const PlayerService = require('../service/PlayerService');
const _ = require('lodash');
const logger = require('log4js').getLogger('allianceController');

const allianceController = {
  fetchByName: async (req, res, next) => {
    AllianceService.fetchByName(req.params.name)
      .then( alliance => {
        PlayerService.mergeAndSave(alliance.members);
        res.send(alliance);
      })
      .catch(e => next(e))
    ;
  },
  fetchByGuid: async (req, res, next) => {
    AllianceService.fetchByGuid(req.params.guid)
      .then(alliance => {
        PlayerService.mergeAndSave(alliance.members);
        res.send(alliance);
      })
      .catch(e => next(e))
    ;
  },
  search: async (req, res, next) => {
    const searchName = req.query.q;
    const includeFull = _.has(req, 'query.includeFull') ? req.query.includeFull : false;
    const includePrivate = _.has(req, 'query.includePrivate') ? req.query.includePrivate : false;

    logger.debug('req.query', req.query);

    if ( ! searchName || searchName.length < 3) {
      next(new MpqdataApiError('Invalid Alliance search'));
    }

    const alliances = await AllianceService.search(searchName, includeFull, includePrivate);
    res.send(alliances);
  }
};

module.exports = allianceController;
