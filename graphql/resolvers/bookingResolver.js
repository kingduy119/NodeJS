const BookingModel = require('../../models/booking');
const { userInstace } = require('./merges');

module.exports = {
    // --- QUERY Booking
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
                };
            });
        } catch (err) { throw err; }
    },

    // --- MUTATION Booking
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
            };
        } catch (err) {
            console.log("Error");
            throw err; 
        }
    },

    cancelBooking: async args => {
        try {
            const booking = await BookingModel.findById(args.bookingID).populate('Event');
            if(!booking) throw new Error('Booking isn\'t existed');
            const event = {
                ...booking._doc.event,
                _id: booking.event,
                creator: userInstace.bind(this, booking.user)
            };
            //await BookingModel.deleteOne( {_id: args.bookingID} );
            return  event;
        } catch (err) { throw err; }
    }
};

















