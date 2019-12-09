const {
    GraphQLObjectType,
    GraphQLSchema
} = require('graphql');

// Schemas
const ItemSchema = require('./ItemSchema');
const UserSchema = require('../schemas/UserSchema');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // User
        FindUserName: UserSchema.findByUsername,

        // Item
        FindItemById: ItemSchema.findById
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // User
        AddUser: UserSchema.addOne,

        // Item
        AddItemOne: ItemSchema.addOne
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});