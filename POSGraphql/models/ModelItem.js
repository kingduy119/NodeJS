const mongoose = require('mongoose');

const schemaItem = mongoose.Schema({
    name: {type: String, require: true},
    total: {type: Number, require: true},
    price: {type: String, require: true},
    product_code: {type: Number, require: true}
});

module.exports = mongoose.model('item', schemaItem);