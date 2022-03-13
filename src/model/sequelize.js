const config = require('../config');
const Sequelize = require('sequelize');
const logger = require('log4js').getLogger('sequelize');

const sequelize = new Sequelize(config.db.url, {
  username: config.db.username,
  password: config.db.password,
  dialect: 'postgres',
  logging: (msg) => logger.trace(msg)
});

sequelize.authenticate()
  .then(logger.info('Database connected.'))
  .catch(e => logger.error(`Database connection failed: ${e}`));

module.exports = sequelize;
