const { default: fetch } = require('node-fetch');
const config = require('../config');
const DisplayCharacter = require('../model/DisplayCharacter');
const DisplayPlayer = require('../model/DisplayPlayer');
const Player = require('../model/Player');
const parseTemplatedString = require('../util/parseTemplatedString');
const { Sequelize } = require('sequelize');
const AbilityLevel = require('../model/AbilityLevel');
const MpqdataApiError = require('../error/MpqdataApiError');
const Ability = require('../model/Ability');
const logger = require('log4js').getLogger('PlayerService');

const headers = {};
headers[config.remoteApis.mpq.deviceIdHeader] = config.remoteApis.mpq.deviceId;

const normalizeCharKeyRegEx = /_\w+$/g;

const fetchRosterEntries = async (apiCharacters) => {
  const criteriaList = apiCharacters.map(convertApiCharacterToLookupTuple);

  const Op = Sequelize.Op;
  const characters = await DisplayCharacter.findAll( {
    include: { model: AbilityLevel, as: 'abilityLevels' },
    where: {
      [Op.or]: criteriaList
    },
    order: [['displayLevel', 'DESC'], ['rarity', 'DESC'], 'name', ['abilityLevels', 'ordinalPosition']]
  } );

  const dbCharsWithAbilLvls = apiCharacters.map(apiChar => {
    const mpqCharId = apiChar.character_identifier.replaceAll(normalizeCharKeyRegEx, '');
    let dbChar = characters.find(c => c.mpqCharacterKey === mpqCharId && c.effectiveLevel === apiChar.effective_level);
    if (dbChar === undefined) {
      logger.error("couldn't find", apiChar);
      throw new MpqdataApiError('Error mapping API character: ' + apiChar);
    }

    dbChar = JSON.parse(JSON.stringify(dbChar));
    applyApiAbilityLevels(apiChar.ability_levels, dbChar.abilityLevels);

    dbChar.instanceId = apiChar.instance_id;
    dbChar.champion = apiChar.is_champion;

    return dbChar;
  });

  return dbCharsWithAbilLvls;
};

const applyApiAbilityLevels = (apiAblityLevels, abilityLevels) => {
  for (let i = 0; i < apiAblityLevels.length; i++) {
    const level = convertAbilityLevel(apiAblityLevels[i]);
    abilityLevels[i].level = level;
  }
};

const fetchApiPlayer = async (name) => {
  const player = await Player.findOne({ where: { playerName: name } });
  const rosterUrl = parseTemplatedString(config.remoteApis.mpq.playerInfoUrl, { playerGuid: player.playerGuid });
  const apiPlayer = await fetch(rosterUrl, { headers }).then(res => res.json());
  return apiPlayer;
};

const convertApiCharacterToLookupTuple = (apiChar) => {
  const mpqCharacterKey = apiChar.character_identifier.replaceAll(normalizeCharKeyRegEx, '');
  const effectiveLevel = apiChar.effective_level;
  const localeLanguage = 'en';
  return { mpqCharacterKey, effectiveLevel, localeLanguage };
};

const convertAbilityLevel = (rawAbilityLevel) => {
  if ( rawAbilityLevel === 0 || rawAbilityLevel === 1) {
    return rawAbilityLevel;
  }
  return (rawAbilityLevel / 5) + 1;
};

const PlayerService = {
  fetchByDisplayPlayerByName: async (name) => {
    const apiPlayer = await fetchApiPlayer(name);
    const characters = await fetchRosterEntries(apiPlayer.roster);
    return new DisplayPlayer(apiPlayer.player_name, apiPlayer.alliance_name, apiPlayer.alliance_role, characters);
  },
  mergeAndSave: async (members) => {
    const names = members.map(m => m.playerName);
    const players = await Player.findAll( { where: { playerName: names } } );
    players.forEach(player => {
      members
        .filter(m => m.playerName === player.playerName)
        .forEach( m => (m.playerId = player.playerId) )
      ;
    });
    const newMembers = members.filter(m => m.playerId === null);
    if (newMembers.length > 0) {
      logger.debug('newMembers', newMembers);
      Player.bulkCreate(newMembers);
    }
  },
  fetchRosteredCharacter: async (playerName, instanceId) => {
    logger.debug(`fetchRosteredCharacter(${playerName}, ${instanceId})`);
    const apiPlayer = await fetchApiPlayer(playerName);
    const apiChar = apiPlayer.roster.find(c => c.instance_id === instanceId);
    const lookupTuple = convertApiCharacterToLookupTuple(apiChar);

    let character = await DisplayCharacter.findOne({
      include: { model: AbilityLevel, as: 'abilityLevels' },
      where: lookupTuple,
      order: [['abilityLevels', 'ordinalPosition']]
    });

    character = JSON.parse(JSON.stringify(character));
    applyApiAbilityLevels(apiChar.ability_levels, character.abilityLevels);
    character.champion = apiChar.is_champion;

    const abilities = await Ability.findAll({
      where: { mpqCharacterKey: character.mpqCharacterKey },
      order: [['abilitySet'], ['ordinalPosition']]
    });
    character.abilities = abilities;

    return character;
  }
};

module.exports = PlayerService;
