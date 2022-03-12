const config = require('../config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.db.url, {
  username: config.db.username,
  password: config.db.password,
  dialect: 'postgres'
});

sequelize.authenticate()
  .then(console.log('Database connected.'))
  .catch(e => console.error(`Database connection failed: ${e}`));

module.exports = sequelize;
