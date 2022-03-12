const DataTypes = require('sequelize');
const AbilityLevel = require('./AbilityLevel');
const sequelize = require('./sequelize');

const DisplayCharacter = sequelize.define('DisplayCharacter', {
  displayCharacterId: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  mpqCharacterKey: DataTypes.STRING,
  name: DataTypes.STRING,
  subtitle: DataTypes.STRING,
  rarity: DataTypes.INTEGER,
  releaseDate: DataTypes.DATE,
  characterBio: DataTypes.STRING,
  displayLevel: DataTypes.INTEGER,
  effectiveLevel: DataTypes.INTEGER,
  imageUrlSmall: DataTypes.STRING,
  imageUrlMedium: DataTypes.STRING,
  imageUrlLarge: DataTypes.STRING,
  localeLanguage: DataTypes.STRING
}, {
  schema: 'mpq_data',
  tableName: 'display_character_vw',
  timestamps: false,
  underscored: true
}
);

DisplayCharacter.hasMany(AbilityLevel, {
  as: 'abilityLevels',
  foreignKey: 'mpqCharacterKey',
  sourceKey: 'mpqCharacterKey'
});

module.exports = DisplayCharacter;
