const Character = require('../models/Character');
const redisClient = require('../redis');

// Resolver para obtener personajes con cache
const getCharacters = async (filter) => {
  const key = JSON.stringify(filter);
  const cachedCharacters = await redisClient.get(key);

  if (cachedCharacters) {
    console.log('Returning cached data');
    return JSON.parse(cachedCharacters);
  }

  const characters = await Character.findAll({
    where: filter, // Aplicar filtros en la consulta
  });
  await redisClient.set(key, JSON.stringify(characters), 'EX', 10);

  console.log('Returning new data');
  return characters;
};

module.exports = { getCharacters };
