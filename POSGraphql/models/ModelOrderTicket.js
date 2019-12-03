const mongoose = require('mongoose');

const schemaOrderTicket = mongoose.Schema({
    status:{type: String, require: true},
    table_id:{type: Number, require: true},
    total_price:{type: Number, require: true},
    list_item:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }
    ]
});

module.exports = mongoose.model('OrderTicket', schemaOrderTicket);