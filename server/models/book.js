const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, require: true},
    author: {type: String, require: true},
    price: {type: Number, require: true},
    bookImage: {type: String, require: true}
});

module.exports = mongoose.model('Books', bookSchema);
