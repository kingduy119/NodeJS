const mongoose = require('mongoose');

const schemaUser = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    phone: {type: String, require: true},
    location: {type: String, require: true},
    date_start: {type: Date},
    date_end:{type: Date},
    active: {type: Boolean, require: true},
    inventory_ticket_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InventoryTicket'
    }
});

module.exports = mongoose.model('User', schemaUser);
