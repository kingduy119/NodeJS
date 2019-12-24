const {
    GraphQLObjectType,
    GraphQLSchema
} = require('graphql');

// Schemas
const ItemSchema = require('./ItemSchema');
const {UserQuery, UserMutation} = require('../schemas/UserSchema');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...UserQuery
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...UserMutation
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});