
const EventModel = require('../../models/eventModel');
const UserModel = require('../../models/userModel');
const BookingModel = require('../../models/booking');
const bcrypt = require('bcrypt');

const tranformEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        // date: new Date(event._doc.date).toISOString(),
        creator: userInstace.bind(this, event.creator)
    };
};

/// --- EVENTS
const eventInstance = async eventIds => {
    try {
        const events = await EventModel.find({ _id: { $in: eventIds } })
        return events.map(event => {
            return tranformEvent(event);
        });        
    } catch (err) {
        throw err;
    }
};

// --- USER
const userInstace = async userId => {
    try {
        const user = await UserModel.findById(userId)
        return {
            ...user._doc,
            _id: user.id,
            createEvent: eventInstance.bind(this, user._doc.createEvent)
        };
    } catch (err) {
        throw err;
    }
};

// --- SIMPLE EVENT
const simpleEvent = async eventID => {
    try {
        const event = await EventModel.findById(eventID);
        return tranformEvent(event);
    } catch (err) { throw err; }
}

// --- Export:
module.exports = {
    // QUERY Event
    events: async () => {
        try {
            const eventList = await EventModel.find();
            eventList.map(event => {
                return tranformEvent(event);
            });
            return eventList;
        } catch (err) { throw err; }
    },

    // QUERY Booking
    bookings: async () => {
        try {
            const bookingList = await BookingModel.find();
            console.log("Length: " + bookingList.length);
            return bookingList.map(booking => {
                return {
                    ...booking._doc,
                    _id: booking.id,
                    user: userInstace.bind(this, booking._doc.user),
                    event: simpleEvent.bind(this, booking._doc.event)
                    // ,
                    // createAt: new Date(booking._doc.createAt).toISOString(),
                    // updateAt: new Date(booking._doc.updateAt).toISOString()
                };
            });
        } catch (err) { throw err; }
    },

    createEvent: async args => {
        const event = new EventModel({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: args.eventInput.price,
            creator: args.eventInput.userID
        });

        try {
            const result = await event.save();
            const createEvent = tranformEvent(result);

            const findUser = await UserModel.findById(args.eventInput.userID);
            if(!findUser) {throw new Error('User not found.');}

            findUser.createEvent.push(createEvent);
            await findUser.save();

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

    createBooking: async args => {
        try {
            const findEvent = await EventModel.findById(args.eventID);
            if(!findEvent) throw new Error("Event isn\'t exist");

            const booking = new BookingModel({
                user: "5da3fce038d821109008d1d2",
                event: findEvent
            });
            const result = await booking.save();
            return {
                ...result._doc,
                _id: result.id,
                user: userInstace.bind(this, booking._doc.user),
                event: simpleEvent.bind(this, booking._doc.event)
                // ,
                // createAt: new Date(result._doc.createAt).toISOString(),
                // updateAt: new Date(result._doc.updateAt).toISOString()
            };
        } catch (err) {
            console.log("Error");
            throw err; 
        }
    },

    cancelBooking: async args => {
        try {
            const booking = await BookingModel.findById(args.bookingID).populate('event');
            if(!booking) throw new Error('User isn\'t existed');

            const event = {
                ...booking.event._doc,
                _id: booking.event.id
                
            };
            await BookingModel.deleteOne( {_id: args.bookingID} );
            return  event;
        } catch (err) { throw err; }
    }
};


