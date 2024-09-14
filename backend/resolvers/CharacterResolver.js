const Character = require("../models/Character");
const redisClient = require("../redis");

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
    return Character.findAll({ where: filter });// Leo directamente de la base de datos
  } 
  else {
    const key = JSON.stringify(filter);
    const cachedCharacters = await redisClient.get(key);

    if (cachedCharacters) {
      console.log("Returning cached data");
      return JSON.parse(cachedCharacters);
    } else {
      // Solo se ejecuta si no hay datos en caché
      const characters = await Character.findAll({
        where: filter,
      });
      await redisClient.set(key, JSON.stringify(characters), "EX", 300); // 5minutos

      console.log("Returning new data");
      return characters;
    }
  }
};

module.exports = { getCharacters };
