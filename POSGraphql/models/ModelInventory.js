const mongoose = require('mongoose');

const schemaInventoryTicket = mongoose.Schema({
    date_in:{type: Date},
    date_out:{type: Date},
    list_item:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }
    ]
});

const schemaInventory = mongoose.Schema({
    author:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    ticket: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'InventoryTicket'
        }
    ]
});

module.exports = {
    InventoryTicketModel: mongoose.model('InventoryTicket', schemaInventoryTicket),
    InventoryModel: mongoose.model('Inventory', schemaInventory)
}
