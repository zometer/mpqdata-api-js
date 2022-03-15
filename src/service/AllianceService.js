const { default: fetch } = require('node-fetch');
const _ = require('lodash');
const config = require('../config').remoteApis.mpq;
const parseTemplatedString = require('../util/parseTemplatedString');
const Alliance = require('../model/Alliance');
const Player = require('../model/Player');
const MpqdataApiError = require('../error/MpqdataApiError');
const logger = require('log4js').getLogger('AllianceService');

const headers = {};
_.set(headers, config.deviceIdHeader, config.deviceId);

const fetchByGuid = async (guid) => {
  logger.debug(`starting fetchByGuid(${guid})`);
  const infoUrl = parseTemplatedString(config.allianceInfoUrl, { allianceGuid: guid });

  const alliance = await fetch(infoUrl, { headers })
    .then(res => res.json())
    .then(buildFromApiAlliance)
  ;
  return alliance;
};

const fetchByName = async (name) => {
  logger.debug(`starting fetchByName(${name})`);

  const apiAlliances = await search(name, true, true);

  logger.debug('apiAlliances', apiAlliances);
  if (apiAlliances.length !== 1 || apiAlliances[0].alliance_name.toLowerCase() !== name.toLowerCase()) {
    throw new MpqdataApiError(`Could not find Alliance: ${name}`);
  }

  const guid = apiAlliances[0].alliance_guid;
  const alliance = await fetchByGuid(guid);
  return alliance;
};

const buildFromApiAlliance = (apiAlliance) => {
  const alliance = new Alliance(apiAlliance.alliance_guid, apiAlliance.alliance_name, apiAlliance.alliance_type, apiAlliance.alliance_max_size);
  alliance.members = apiAlliance.alliance_members
    .map(m => Player.build({ playerName: m.name, playerGuid: m.guid, allianceRole: m.role }) )
  ;
  return alliance;
};

const search = async (name, includeFull, includePrivate) => {
  const searchUrl = parseTemplatedString(config.allianceSearchUrl, {
    allianceNameSearch: name,
    excludeFull: ! JSON.parse(includeFull),
    excludePrivate: ! JSON.parse(includePrivate)
  });

  logger.debug('searchUrl', searchUrl);
  const allianceSearchResults = await fetch(searchUrl, { headers })
    .then(res => res.json())
    .then(res => res.results)
    .then(res => res.map(searchResult => new Alliance(
      searchResult.alliance_guid, searchResult.alliance_name, searchResult.alliance_type, searchResult.alliance_max_size, searchResult.alliance_size)
    ))
    .catch(e => MpqdataApiError.throw(`Error mapping alliance search results: ${e.message}`))
  ;

  return allianceSearchResults;
};

const AllianceService = { fetchByGuid, fetchByName, search };

module.exports = AllianceService;
