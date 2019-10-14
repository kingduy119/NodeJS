const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
    {
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);