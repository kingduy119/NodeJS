const mongoose = require('mongoose');

const schemaItem = mongoose.Schema({
    name: {type: String, require: true},
    total: {type: Number, require: true},
    price: {type: Number, require: true},
    inventory_ticket_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InventoryTicket'
    }
});

module.exports = mongoose.model('Item', schemaItem);