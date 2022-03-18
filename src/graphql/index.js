const { readFileSync } = require('fs');
const { buildSchema } = require('graphql');
const { hello } = require('../service/HelloService');
const AllianceService = require('../service/AllianceService');
const PlayerService = require('../service/PlayerService');
const CharacterCoverService = require('../service/CharacterCoverService');

const schemaContent = readFileSync('./src/graphql/schema.graphql', 'utf-8');
const schema = buildSchema(schemaContent);

const resolver = {
  hello,
  allianceByName: ({ name }) => AllianceService.fetchByName(name),
  allianceByGuid: ({ guid }) => AllianceService.fetchByGuid(guid),
  searchAlliances: ({ name, includeFull, includePrivate }) => AllianceService.search(name, includeFull, includePrivate),
  playerByName: ({ name }) => PlayerService.fetchByDisplayPlayerByName(name),
  rosteredCharacter: ({ name, instanceId }) => PlayerService.fetchRosteredCharacter(name, instanceId),
  unprocessedCovers: () => CharacterCoverService.fetchUnprocessed()
};

const graphqlOptions = {
  schema,
  rootValue: resolver,
  graphiql: false
};

module.exports = { ...graphqlOptions };
