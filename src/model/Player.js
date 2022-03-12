const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Player = sequelize.define('Player', {
  playerId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrementIdentity: true
  },
  playerName: DataTypes.STRING(100),
  playerGuid: DataTypes.STRING(100),
  allianceRole: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.getDataValue('allianceRole');
    },
    set(value) {
      this.setDataValue('allianceRole', value);
    }
  }
}, {
  schema: 'mpq_data',
  tableName: 'player',
  timestamps: false,
  underscored: true
});

module.exports = Player;
