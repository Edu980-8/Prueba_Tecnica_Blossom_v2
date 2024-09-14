const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLInputObjectType } = require('graphql');
const CharacterType = require('../types/CharacterType'); // Define el tipo Character
const { getCharacters } = require('../resolvers/CharacterResolver'); // Resolver para obtener personajes

// Definir el tipo de entrada para los filtros
const CharacterFilterInputType = new GraphQLInputObjectType({
  name: 'CharacterFilterInput',
  fields: {
    name: { type: GraphQLString },
    status: { type: GraphQLString },
    species: { type: GraphQLString },
    gender: { type: GraphQLString },
    origin: { type: GraphQLString },
  }
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    characters: {
      type: new GraphQLList(CharacterType),
      args: {
        filter: { type: CharacterFilterInputType }, // Usar el tipo de entrada para filtros
      },
      resolve(parent, args) {
        return getCharacters(args.filter || {}); // Pasar los filtros al resolver
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
