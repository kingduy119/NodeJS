const mongoose = require('mongoose');

const schemaInventoryTicket = mongoose.Schema({
    method_io:{type: String, require: true},
    date_in:{type: Date},
    date_out:{type: Date},
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    list_item:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }
    ]
});

const schemaInventory = mongoose.Schema({
    day: {type: Date, require: true},
    total_item:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }
    ],
    ticket_input: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'InventoryTicket'
        }
    ],
    ticket_output: [
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
