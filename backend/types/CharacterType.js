const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const CharacterType = new GraphQLObjectType({
  name: 'Character',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    species: { type: GraphQLString },
    gender: { type: GraphQLString },
    status: { type: GraphQLString },
    origin: { type: GraphQLString },
    image: { type: GraphQLString }
  })
});

module.exports = CharacterType;
