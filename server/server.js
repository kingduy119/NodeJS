const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const port = process.env.PORT || 1000;

const server = http.createServer(app);
const client = require('socket.io')(server).sockets;

const schemaChat = mongoose.Schema({
    name: {type: String},
    message: {type: String}
});

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
        mongoose.Promise = global.Promise;

        client.on('connection', async (socket) => {
            let ChatModel = mongoose.model('chat', schemaChat);

            // Create func to send status
            let sendStatus = (s) => {
                socket.emit('status', s);
            };

            // Get chats from mongo collection
            const res = await ChatModel.find({});
            console.log(res);
            socket.emit('output', res);// Emit input events
            

            // Handle input events
            socket.on('input', (data) => {
                let name = data.name;
                let message = data.message;

                // Check for name and message
                if(name == '' || message == '') {
                    sendStatus('Please enter a name and message');
                } else {
                    // Insert message
                    ChatModel.create({name: name, message: message}, () => {
                        socket.emit('output', [data]);

                        // Send status object
                        sendStatus({
                            message: 'Message sent',
                            clear: true
                        });
                    });
                }
            });

            // Handle clear
            socket.on('clear', (data) => {
                // Remove all chats from collection
                ChatModel.deleteMany({}, () => {
                    socket.emit('cleared');
                });
            });
        }); // Connect to socket.io

        server.listen(port);
        console.log('Successfully connected to server mongodb atlas');
    })
    .catch(err => {
        console.log(err);
    });
// ===========================================================================
