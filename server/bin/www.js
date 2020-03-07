

/**
 * Module dependencies.
 */

var http = require('http');
var app = require('../app');
var mongoose = require('mongoose');

/**
 * Get port from environment and store in Express
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Mongoose connection to MongoDB server
 */

var options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
};
var uri = `mongodb+srv://${
    process.env.MONGO_ATLAS_USER}:${
    process.env.MONGO_ATLAS_PW}@${
    process.env.MONGO_ATLAS_CLUSTER}/${
    process.env.MONGO_ATLAS_DATABASE}?retryWrites=true&w=majority`;

mongoose
    .connect(uri, options)
    .then(result => {
        console.log("Connected to MongoDB Server!");
    })
    .catch(err => {
        console.log(err);
    })

/**
 * Create Server.
 * Listen on provided port, on all network interfaces.
 */

var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if(isNaN(port)) return val;
    if(port >= 0) return port;

    return false;
}

/**
 * 
 * Handle Error
 */

function onError(error) {
    if(error.syscall !== 'listen')

    var bind = typeof port === 'string'
        ? 'Pippe ' + port
        : 'Port' + port;

    // handle specific listen errors with friendly messages
    switch(error.code) {
        case 'EACCES':
            console.error(bind + 'requires eveate privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
            default:
                throw error;
    }
}

/**
 * Event Listener for HTTP server "listening event".
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Server.Listening on ' + bind);
}
