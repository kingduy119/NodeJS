const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require:true
    },
    price: {
        type: Number,
        require: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('event', eventSchema);
