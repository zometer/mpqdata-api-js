const { default: fetch } = require("node-fetch");
const config = require("../config");
const DisplayCharacter = require("../model/DisplayCharacter");
const DisplayPlayer = require("../model/DisplayPlayer");
const Player = require("../model/Player");
const parseTemplatedString = require("../util/parseTemplatedString");
const { Sequelize } = require("sequelize");

const headers = {}
headers[config.remoteApis.mpq.deviceIdHeader] = config.remoteApis.mpq.deviceId; 

const fetchRosterEntries = async (apiCharacters) => { 
  const criteriaList = apiCharacters
    .map( c=> {
      let mpqCharacterKey = c.character_identifier.replaceAll(/_\w+$/g, ""); 
      let effectiveLevel = c.effective_level; 
      let localeLanguage = 'en'; 
      return { mpqCharacterKey, effectiveLevel, localeLanguage }; 
    })
  ;

  const Op = Sequelize.Op;
  const characters = await DisplayCharacter.findAll( {
    attributes: {
      exclude: ['characterBio']
    },
    where: {
      [Op.or]: criteriaList
    }
  } );
  return characters;
}

const PlayerService = {
  fetchByDisplayPlayerByName: async (name) => { 
    const player = await Player.findOne( {where: {playerName: name}} ); 
    const rosterUrl = parseTemplatedString(config.remoteApis.mpq.playerInfoUrl, {playerGuid: player.playerGuid}); 
    const apiPlayer = await fetch(rosterUrl, {headers}).then( res => res.json() ) ;
    const characters = await fetchRosterEntries(apiPlayer.roster); 
    return new DisplayPlayer(apiPlayer.player_name, apiPlayer.alliance_name, apiPlayer.alliance_role, characters);
  },
  mergeAndSave: async (members) => {
    const names = members.map(m => m.playerName); 
    const players = await Player.findAll( {where: {playerName: names}} );
    players.forEach(player => {
      members
        .filter(m => m.playerName === player.playerName)
        .forEach( m => m.playerId = player.playerId ) 
      ;
    });
    const newMembers = members.filter(m => m.playerId === null); 
    if (newMembers.length > 0) { 
      console.log("newMembers", newMembers);
      Player.bulkCreate(newMembers); 
    }
  }
}; 

module.exports = PlayerService;