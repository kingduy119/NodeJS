
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull
} = require('graphql');

const {
    GraphQLDate
} = require('graphql-iso-date');

const ModelUser = require('../models/ModelUser');

// User Type:
const UserType = new GraphQLObjectType({
    name:'User',
    field: () => ({
        username:{type: GraphQLString},
        password:{type: GraphQLString}
        // phone:{type: GraphQLString},
        // location:{type: GraphQLString},
        // date_start:{type: GraphQLDate},
        // date_end:{type: GraphQLDate},
        // active:{type: GraphQLBoolean}
    })
});

exports.addOne = {
    type: UserType,
    args: {
        username:{type: GraphQLString},
        password:{type: GraphQLString}
    },
    resolve: async (parent, args) => {
        user = new ModelUser({
            username: args.username,
            password: args.password
        });
        return await user.save();
    }
}

exports.findByUsername = {
    type: UserType,
    args: {
        username: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: async (parent, args) => {
        return await ModelUser.find({username: args.username});
    }
}
