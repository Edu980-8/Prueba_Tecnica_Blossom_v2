const axios = require('axios');
const Character = require('../models/Character');

const initializeDB = async () => {
  const { data } = await axios.get('https://rickandmortyapi.com/api/character');
  const characters = data.results.slice(0, 15);
  console.log(data);
  for (const char of characters) {
    await Character.create({
      name: char.name,
      status: char.status,
      species: char.species,
      gender: char.gender,
      origin: char.origin.name,
      image: char.image
    });
  }
};

initializeDB();
