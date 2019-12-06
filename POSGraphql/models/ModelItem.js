const mongoose = require('mongoose');

const schemaItem = mongoose.Schema({
    name: {type: String, require: true},
    total: {type: Number, require: true},
    price: {type: Number, require: true},
    product_id: {type: Number, require: true}
});

module.exports = mongoose.model('Item', schemaItem);