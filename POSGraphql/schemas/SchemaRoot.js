const {
    GraphQLObjectType,
    GraphQLSchema
} = require('graphql');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

    }
});

const RootQuery = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        InventoryIn: 
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});