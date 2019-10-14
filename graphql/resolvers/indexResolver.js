
const EventModel = require('../../models/eventModel');
const UserModel = require('../../models/userModel');
const BookingModel = require('../../models/booking');
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
    booking: async () => {
        try {
            const bookings = await BookingModel.find();
            return bookings.map(booking => {
                return {
                    ...booking._doc,
                    _id: booking.id,
                    createAt: new Date(booking._doc.createAt).toISOString(),
                    updateAt: new Date(booking._doc.updateAt).toISOString()
                }
            });
        } catch (err) { throw err; }
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
            const creator = await UserModel.findById('5d9cd296a9f9aa151094cbcf');
            if(!creator) {throw new Error('User not found.');}
            creator.createEvents.push(createEvent);
            await creator.save();
            
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
    },
    bookEvent: async args => {
        const fetchedEvent = await EventModel.findOne({_id: args.eventID});
        const booking = new BookingModel({
            user: '5d9cd296a9f9aa151094cbcf',
            event: fetchedEvent
        });
        const result = booking.save();
        return {
            ...result._doc,
            _id: result.id,
            createAt: new Date(result._doc.createAt).toISOString(),
            updateAt: new Date(result._doc.updateAt).toISOString()
        }
    }
};


