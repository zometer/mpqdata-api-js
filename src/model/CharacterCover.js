const DataTypes = require('sequelize');
const sequelize = require('./sequelize');

const CharacterCover = sequelize.define('CharacterCover', {
  characterCoverId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrementIdentity: true
  },
  mpqCharacterKey: DataTypes.STRING(100),
  marvelIssueId: DataTypes.INTEGER,
  gcdIssueId: DataTypes.INTEGER,
  series: DataTypes.STRING(250),
  seriesStartYear: DataTypes.INTEGER,
  issue: DataTypes.STRING(10),
  variant: DataTypes.STRING(100),
  customCover: DataTypes.BOOLEAN,
  defaultCover: DataTypes.BOOLEAN,
  mpqEventName: DataTypes.STRING(100),
  ordinalPosition: DataTypes.INTEGER,
  imageUrlSmall: DataTypes.STRING(256),
  imageUrlMedium: DataTypes.STRING(256),
  imageUrlLarge: DataTypes.STRING(256),
  complete: DataTypes.BOOLEAN
}, {
  schema: 'mpq_data',
  tableName: 'character_cover',
  timestamps: false,
  underscored: true
});

module.exports = CharacterCover;
