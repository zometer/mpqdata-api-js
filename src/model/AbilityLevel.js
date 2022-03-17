const DataTypes = require('sequelize');
const sequelize = require('./sequelize');

const AbilityLevel = sequelize.define('AbilityLevel', {
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
  level: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.getDataValue('level');
    },
    set(value) {
      this.setDataValue('level', value);
    }
  }
}, {
  schema: 'mpq_data',
  tableName: 'display_ability_level_vw',
  timestamps: false,
  underscored: true
});

module.exports = AbilityLevel;
