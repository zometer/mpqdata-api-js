const { default: fetch } = require("node-fetch");
const _ = require('lodash');
const config = require("../config").remoteApis.mpq;
const parseTemplatedString = require("../util/parseTemplatedString");
const Alliance = require("../model/Alliance");
const Player = require("../model/Player");
const MpqdataApiError = require("../error/MpqdataApiError");

const headers = {} ; 
_.set(headers, config.deviceIdHeader, config.deviceId);

const fetchByGuid = async (guid) => { 
  console.debug(`starting fetchByGuid(${guid})`); 
  const infoUrl = parseTemplatedString(config.allianceInfoUrl, {allianceGuid: guid}); 

  const alliance = await fetch(infoUrl, {headers})
    .then(res => res.json())
    .then(buildFromApiAlliance)
  ;
  return alliance;
}

const fetchByName = async (name) => { 
  console.debug(`starting fetchByName(${name})`); 

  allianceSearchResults = await search(name, true, true);

  console.debug("apiAlliances", allianceSearchResults);
  if (allianceSearchResults.results.length !== 1 || allianceSearchResults.results[0].alliance_name.toLowerCase() !== name.toLowerCase()) { 
    throw new MpqdataApiError(`Could not find Alliance: ${name}`); 
  }

  const guid = allianceSearchResults.results[0].alliance_guid; 
  const alliance = await fetchByGuid(guid);
  return alliance; 
}

const buildFromApiAlliance = (apiAlliance) => { 
  console.log("build", apiAlliance);
  let alliance = new Alliance(apiAlliance.alliance_guid, apiAlliance.alliance_name, apiAlliance.alliance_type, apiAlliance.alliance_max_size);
  alliance.members = apiAlliance.alliance_members
    .map(m => Player.build({playerName: m.name, playerGuid: m.guid, allianceRole: m.role}) )
  ;
  return alliance;
}

const search = async (name, includeFull, includePrivate) => {
  const searchUrl = parseTemplatedString(config.allianceSearchUrl, {
    allianceNameSearch: name,
    excludeFull: ! JSON.parse(includeFull), 
    excludePrivate: ! JSON.parse(includePrivate)
  }); 

  console.debug("searchUrl", searchUrl);
  const allianceSearchResults = await fetch(searchUrl, {headers}).then(res => res.json()) ;

  return allianceSearchResults.results;
}

const AllianceService = { fetchByGuid, fetchByName, search } ;

module.exports = AllianceService; 
