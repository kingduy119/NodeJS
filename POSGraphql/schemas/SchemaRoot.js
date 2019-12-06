const {
    GraphQLObjectType,
    GraphQLSchema
} = require('graphql');

// Schemas
const ItemSchema = require('./ItemSchema');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        FindItem: ItemSchema.findItem
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        AddItem: ItemSchema.addItem 
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});