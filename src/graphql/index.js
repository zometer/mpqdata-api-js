const { readFileSync } = require('fs');
const { buildSchema } = require('graphql');
const { hello } = require('../service/HelloService');
const AllianceService = require('../service/AllianceService');

const schemaContent = readFileSync('./src/graphql/schema.graphql', 'utf-8');
const schema = buildSchema(schemaContent);

const resolver = {
  hello,
  allianceByName: ({ name }) => AllianceService.fetchByName(name),
  allianceByGuid: ({ guid }) => AllianceService.fetchByGuid(guid),
  searchAlliances: ({ name, includeFull, includePrivate }) => AllianceService.search(name, includeFull, includePrivate)
};

const graphqlOptions = {
  schema,
  rootValue: resolver,
  graphiql: false
};

module.exports = { ...graphqlOptions };
