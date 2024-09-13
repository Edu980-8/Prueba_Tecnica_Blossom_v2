const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./index.js');

const Character = sequelize.define('Character', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: DataTypes.STRING,
  species: DataTypes.STRING,
  gender: DataTypes.STRING,
  origin: DataTypes.STRING,
  image: DataTypes.STRING
});

module.exports = Character;
