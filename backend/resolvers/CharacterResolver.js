const Character = require("../models/Character");
const redisClient = require("../redis");
const { Op } = require("sequelize");  // Asegúrate de que Op está importado
const sequelize = require("../models").sequelize; // Importa sequelize si es necesario

require("dotenv").config();
const environment = process.env.NODE_ENV;

// Resolver para obtener personajes con cache
const getCharacters = async (filter) => {
  console.log("Running in ", environment);

  const sequelizeFilter = {};

  if (filter.name) {
    sequelizeFilter.name = {
      [Op.iLike]: `%${filter.name}%`, // Utiliza `iLike` para búsqueda insensible a mayúsculas/minúsculas
    };
  }
  if (filter.status) {
    sequelizeFilter.status = filter.status;
  }
  if (filter.species) {
    sequelizeFilter.species = filter.species;
  }
  if (filter.gender) {
    sequelizeFilter.gender = filter.gender;
  }

  if (environment === "development") {
    // En desarrollo, ignorar el caché
    console.log("Development mode: Skipping cache");
    return Character.findAll({ where: sequelizeFilter }); // Corrige el filtro sequelize
  } else {
    const key = JSON.stringify(filter);
    const cachedCharacters = await redisClient.get(key);

    if (cachedCharacters) {
      console.log("Returning cached data");
      return JSON.parse(cachedCharacters);
    } else {
      // Solo se ejecuta si no hay datos en caché
      const characters = await Character.findAll({
        where: sequelizeFilter,
      });
      await redisClient.set(key, JSON.stringify(characters), "EX", 300); // 5 minutos

      console.log("Returning new data");
      return characters;
    }
  }
};

// Nueva función para obtener valores únicos de una columna
const getUniqueValues = async (field) => {
  try {
    const uniqueValues = await Character.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col(field)), field]], // SELECT DISTINCT
      raw: true, // Devuelve solo los valores planos
    });

    return uniqueValues.map(item => item[field]); // Devuelve solo los valores únicos
  } catch (error) {
    console.error(`Error fetching unique ${field}:`, error);
    throw new Error("Error fetching unique values");
  }
};

module.exports = { getCharacters, getUniqueValues };
