const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    createdEvents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
});

module.exports = mongoose.model('Users', userSchema);