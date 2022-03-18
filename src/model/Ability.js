const DataTypes = require('sequelize');
const sequelize = require('./sequelize');

const Ability = sequelize.define('Ability', {
  abilityId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrementIdentity: true
  },
  abilityKey: DataTypes.STRING,
  mpqCharacterKey: DataTypes.STRING,
  abilitySet: DataTypes.INTEGER,
  ordinalPosition: DataTypes.INTEGER,
  color: DataTypes.STRING,
  cost: DataTypes.INTEGER,
  name: DataTypes.STRING,
  description: DataTypes.STRING
}, {
  schema: 'mpq_data',
  tableName: 'display_ability_vw',
  timestamps: false,
  underscored: true
});

module.exports = Ability;
