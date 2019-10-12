
const EventModel = require('../../models/eventModel');
const UserModel = require('../../models/userModel');

const events = eventIds => {
    return EventModel.find({ _id: { $in: eventIds } })
        .then(events => {
            return events.map(event => {
                return { ...event._doc,
                        _id: event.id,
                        creator: user.bind(this, event._doc.creator)
                    };
            });
        })
        .catch(err => {
            throw err;
        });
};

const user = userId => {
    return UserModel.findById(userId)
        .then(user => {
            return { ...user._doc,
                    _id: user.id,
                    createEvents: events.bind(this, user._doc.createEvents)
                };
        })
        .catch(err => {
            throw err;
        });
};

module.exports = {
    events: () => {
        return EventModel.find()
            .then(events => {
                return events.map(event => {
                    return { 
                        ...event._doc,
                        _id: event.id,
                        creator: user.bind(this, event.creator)
                    };
                });
            })
            .catch(err => {
                throw err;
            });   
    },

    createEvent: args => {
        const event = new EventModel({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5d9cd296a9f9aa151094cbcf'
        });

        let createEvent;
        return event
            .save()
            .then(result => {
                console.log(result);
                createEvent = { ...result._doc, _id: result._doc._id.toString() };
                return UserModel.findById('5d9cd296a9f9aa151094cbcf');
            })
            .then(user => {
                if(!user) { throw new Error('User not found.'); }
                user.createEvents.push(event);
                return user.save();
            })
            .then(result => {
                return createEvent;
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    },

    createUser: args => {
        return bcrypt
            .hash(args.userInput.password, 10)
            .then(hashedPassword => {
                const user = new UserModel({
                    email: args.userInput.email,
                    password: hashedPassword
                });
                return user.save();
            })
            .then(result => {
                return {
                    ...result._doc,
                    password: result.password,
                    _id: result.id
                };
            })
            .catch(err => {
                throw err;
            });
    }
};

