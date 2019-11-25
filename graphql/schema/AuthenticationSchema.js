
const axios = require('axios');
const UserModel = require('../../models/userModel');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// Type
const AuthenticationType = new GraphQLObjectType({
    name:'authentication',
    fields:() => ({
        id:{type: GraphQLString},
        name:{type: GraphQLString},
        email:{type: GraphQLString},
        age:{type: GraphQLInt}
    })
});


// Query
exports.readUser = {
    type: AuthenticationType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve(parentValue, args) {
        return axios.get('http://localhost:3000/users/' + args.id)
            .then(res => res.data);
    }
};

exports.readAllUser = {
    type: new GraphQLList(AuthenticationType),
    resolve(parentValue, args){
        return axios.get('http://localhost:3000/users')
            .then(res => res.data);
    }
};

// Mutation
exports.createUser = {
    type: AuthenticationType,
    args: {
        id: {type: GraphQLString},
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
    },
    resolve(parentValue, args){
        return axios.post('http://localhost:3000/users', {
            name: args.name,
            email: args.email,
            age: args.age
        })
        .then(res => res.data);
    }
};

exports.updateUser = {
    type:AuthenticationType,
    args:{
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
    },
    resolve(parentValue, args){
        return axios.patch('http://localhost:3000/users/'+ args.id, {
            name: args.name,
            email: args.email,
            age: args.age
        })
            .then(res => res.data);
    }
};

exports.deleteUser = {
    type:AuthenticationType,
    args:{
        id: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve(parentValue, args){
        return axios.delete('http://localhost:3000/users/'+ args.id)
            .then(res => res.data);
    }
};



