
const {
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
    } = require('graphql')
const { EventType } = require('../../types/Types');
const EventModel = require('../../models/EventModel');
const UserModel = require('../../models/UserModel');
const TypeHelper = require('../../helpers/TypeHelper');

exports.listEvent = {
    type: new GraphQLList(EventType),
    resolve: async (parent, args) => {
        return await EventModel.find({});
    }
}

exports.createEvent = {
    type: EventType,
    args: {
        username: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: async (parent, args) => {
        let user = await UserModel.findOne({username: args.username});
        if(!user) throw new Error('Username is not exist!');

        let event = new EventModel({
            title: args.title,
            description: args.description,
            creator: user.id
        });
        
        try {
            user.events.push(event.id);
            await user.save();
            await event.save();
            return event;
        } catch (err) { throw err; }
    }
};


