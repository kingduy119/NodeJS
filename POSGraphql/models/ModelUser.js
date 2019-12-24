const mongoose = require('mongoose');

const schemaUser = mongoose.Schema({
    username: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true}
});

module.exports = mongoose.model('User', schemaUser);
