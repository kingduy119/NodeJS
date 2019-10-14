
const EventModel = require('../../models/eventModel');
const UserModel = require('../../models/userModel');
const bcrypt = require('bcrypt');

/// --- EVENTS
const events = async eventIds => {
    try {
        const events = await EventModel.find({ _id: { $in: eventIds } })
        return events.map(event => {
            return { ...event._doc,
                    _id: event.id,
                    // price: event.price,
                    data: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event._doc.creator)
                };
        });        
    } catch (err) {
        throw err;
    }
};

// --- USER
const user = async userId => {
    try {
        const user = await UserModel.findById(userId)
        return {
            ...user._doc,
            _id: user.id,
            createEvents: events.bind(this, user._doc.createEvents)
        };
    } catch (err) {
        throw err;
    }
};

// --- Export:
module.exports = {
    events: async () => {
        try {
            const events = await EventModel.find();
            return events.map(event => {
                return { 
                    ...event._doc,
                    _id: event.id,
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event.creator)
                };
            });
        } catch (err) {
            throw err;
        }
    },
    createEvent: async args => {
        const event = new EventModel({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5d9cd296a9f9aa151094cbcf'
        });

        try {
            let createEvent;
            const result = await event.save();
            createEvent = {
                ...result._doc,
                _id: result._doc._id.toString(),
                date: new Date(result._doc.date).toISOString(),
                creator: await user.bind(this, result._doc.creator)
            };
            const user = await UserModel.findById('5d9cd296a9f9aa151094cbcf');
            if(!user) {throw new Error('User not found.');}
            await user.save();
            
            return createEvent;
        } catch (err) { throw err; }
    },
    createUser: async args => {
        try {
            const oldUser = await UserModel.findOne( {email: args.userInput.email} );
            if(oldUser) { throw new Error('Email exists already'); }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const newUser = new UserModel({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await newUser.save();

            return {
                ...result._doc,
                password: result.password,
                _id: result.id
            };
        } catch (err) { throw err; }
    }
};


