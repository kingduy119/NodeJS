
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLSchema,
} = require('graphql');

const AuthSchema = require('./AuthenticationSchema');

// Root Query
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        FindUser: AuthSchema.readUser,
        ListUser: AuthSchema.readAllUser
    }
});


// Mutation
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        CreateUser: AuthSchema.createUser,
        UpdateUser: AuthSchema.updateUser,
        DeleteUser: AuthSchema.deleteUser
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
