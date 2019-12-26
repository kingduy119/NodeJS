
const {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const {
    GraphQLDate
} = require('graphql-iso-date');

const ModelUser = require('../models/ModelUser');

const { Client } = require('../../cache/Redis');

// User Type:
const UserType = new GraphQLObjectType({
    name:'User',
    fields: () => ({
        id: {type: GraphQLID},
        username:{type: GraphQLString},
        email:{type: GraphQLString},
        password:{type: GraphQLString}
    })
});

exports.UserQuery = {
    Users: {
        type: new GraphQLList(UserType),
        resolve: async (parent, args) => {
            Client.get('users', (err, data) => {
                if(err) console.log(err);
                if(data) return data;
            })

            const data = await ModelUser.find();
            Client.setex('users', 3600, JSON.stringify(data));
            return data;
        }
    },
    User: {
        type: UserType,
        args: {
            username: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve: async (parent, args) => {
            return await ModelUser.findOne({username: args.username});
        }
    }
}

exports.UserMutation = {
    Create: {
        type: UserType,
        args: {
            username:{type: new GraphQLNonNull(GraphQLString)},
            email:{type: new GraphQLNonNull(GraphQLString)},
            password:{type: new GraphQLNonNull(GraphQLString)}
        },
        resolve: async (parent, args) => {
            return ModelUser.create({
                username: args.username,
                email: args.email,
                password: args.password
            });
        }
    }
}

exports.updateOne = {
    type: UserType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        username: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: async (parent, args) => {
        let user = await ModelUser.updateOne({_id: args.id},{
            username: args.username,
            email: args.email,
            password: args.password
        });
        return ModelUser.findById({_id: args.id});
    }
}

exports.deleteOnce = {
    type: UserType,
    args: {
        username: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: async (parent, args) => {
        return await ModelUser.deleteOne({username: args.username});
    }
}