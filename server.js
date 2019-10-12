const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const port = process.env.PORT || 1000;

const server = http.createServer(app);

// Mongoose connection:
// ===========================================================================
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
};

const uri = `mongodb+srv://${
    process.env.MONGO_ATLAS_USER}:${
    process.env.MONGO_ATLAS_PW}@${
    process.env.MONGO_ATLAS_CLUSTER}/${
    process.env.MONGO_ATLAS_DATABASE}?retryWrites=true&w=majority`;

mongoose
    .connect(uri, options)
    .then(() => {
        console.log('Successfully connected to server mongodb atlas');
        mongoose.Promise = global.Promise;
        server.listen(port);
    })
    .catch(err => {
        console.log(err);
    });
// ===========================================================================
