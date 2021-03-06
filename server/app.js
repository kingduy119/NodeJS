const express = require('express');
const helmet = require('helmet');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const isAuth = require('./middleware/is-auth');

// Redis connect:
// ===========================================================================
const Redis = require('./cache/Redis');

Redis.getClient().on('connect', () => {
    console.log("Redis connected success!");
});

Redis.getClient().on('reconnecting', () => {
    console.log("Redis reconnected success!");
});

Redis.getClient().on('error', () => {
    console.log(`Error: ${err}`);
});

// ===========================================================================

app.use(helmet());
// app.use(morgan('dev'));
// app.use('/upload', express.static('upload'));
// app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// GraphQL
// ===========================================================================
const graphqlHTTP = require('express-graphql');
const RootSchema = require('./schemas/SchemaRoot');

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     if(req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
//     next();
// });


app.use(isAuth);
app.use('/graphql',
    graphqlHTTP(async(request, response, graphQLParams) => ({
        schema: RootSchema,
        graphiql: true
    }))
);
// ===========================================================================

// Set up:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Handle error:
// ===========================================================================

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
// ===========================================================================


module.exports = app;

