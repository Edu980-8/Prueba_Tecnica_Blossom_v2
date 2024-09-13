const Sequelize = require('sequelize');

const sequelize = new Sequelize('rick_morty_db', 'root', 'Database_1608_2024', {
  host: 'localhost',
  port: 3306, 
  dialect: 'mysql'
});

module.exports = sequelize;
