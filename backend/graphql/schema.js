const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLInputObjectType } = require('graphql');
const CharacterType = require('../types/CharacterType');
const { getCharacters, getUniqueValues } = require('../resolvers/CharacterResolver');

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
        filter: { type: CharacterFilterInputType },
      },
      resolve(parent, args) {
        return getCharacters(args.filter || {});
      }
    },
    uniqueStatuses: {
      type: new GraphQLList(GraphQLString),
      resolve() {
        return getUniqueValues('status');
      }
    },
    uniqueSpecies: {
      type: new GraphQLList(GraphQLString),
      resolve() {
        return getUniqueValues('species');
      }
    },
    uniqueGenders: {
      type: new GraphQLList(GraphQLString),
      resolve() {
        return getUniqueValues('gender');
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
