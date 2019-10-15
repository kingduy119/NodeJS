const EventModel = require('../../models/eventModel');
const UserModel = require('../../models/userModel');

// --- TRANFORM EVENT
const tranformEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        creator: userInstace.bind(this, event._doc.creator)
    };
};

// --- SIMPLE EVENT
const simpleEvent = async eventID => {
    try {
        const event = await EventModel.findById(eventID);
        return tranformEvent(event);
    } catch (err) { throw err; }
}

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

exports.tranformEvent = tranformEvent;
exports.simpleEvent = simpleEvent;
exports.userInstace = userInstace;
exports.eventInstance = eventInstance;