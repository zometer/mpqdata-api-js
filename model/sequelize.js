const db = require('../config/db'); 
const Sequelize = require('sequelize');

const sequelize = new Sequelize(db.url, {
  username: db.username, 
  password: db.password, 
  dialect: 'postgres'
});

sequelize.authenticate()
  .then(console.log("Database connected."))
  .catch(e => console.error(`Database connection failed: ${e}`))

module.exports = sequelize;
