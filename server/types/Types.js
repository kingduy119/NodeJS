const {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const UserModel = require('../models/UserModel');
const EventModel = require('../models/EventModel');

// Type
const AuthenticationType = new GraphQLObjectType({
    name:'User',
    fields:() => ({
        id:{type: GraphQLString},
        username:{type: GraphQLString},
        password:{type: GraphQLString},
        email:{type: GraphQLString},
        events: {
            type: new GraphQLList(EventType),
            resolve: async (parent, args) => {
                const events = await EventModel.find({_id: {$in: parent.events}});
                return events.map(event => {
                    return event;
                });
            }
        }
    })
});

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => ({
        id:{type: GraphQLString},
        title:{type: GraphQLString},
        description:{type: GraphQLString},
        creator: {  
            type: AuthenticationType,
            resolve: async (parent, args) => {
                return await UserModel.findById(parent.creator);
            }
        }
    })
});

module.exports = {
    AuthenticationType: AuthenticationType,
    EventType: EventType
};