const EventModel = require('../../models/eventModel');
const UserModel = require('../../models/userModel');
const { tranformEvent } = require('./merges');

module.exports = {
    // QUERY Event
    events: async () => {
        try {
            const eventList = await EventModel.find();
            return eventList.map(eventItem => {
                return tranformEvent(eventItem);
            });
        } catch (err) { throw err; }
    },

    createEvent: async (args, req) => {
        // if(!req.isAuth) {
        //     throw new Error('Unauthenticated!');
        // }

        const event = new EventModel({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: args.eventInput.price//,
            //creator: args.eventInput.userID
        });

        try {
            const result = await event.save();
            const createEvent = tranformEvent(result);

            const findUser = await UserModel.findById("5da5ced0ff8f5710bc145389");
            if(!findUser) {throw new Error('User not found.');}

            findUser.createEvent.push(createEvent);
            await findUser.save();

            return createEvent;
        } catch (err) { throw err; }
    }

};






