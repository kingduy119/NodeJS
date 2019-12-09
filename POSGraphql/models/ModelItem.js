const mongoose = require('mongoose');

const schemaItem = mongoose.Schema({
    code: {type: String, require: true},
    name: {type: String, require: true},
    total: {type: Number, require: true},
    price: {type: Number, require: true}
});

module.exports = mongoose.model('Item', schemaItem);