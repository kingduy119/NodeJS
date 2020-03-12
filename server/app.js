var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookiePartser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var helmet = require('helmet');
var graphqlHTTP = require('express-graphql');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var allSchema = require('./schemas/SchemaRoot');

var app = express();

// View engine setup
app.set('views'), path.join(__dirname, 'views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookiePartser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

// Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/graphql',
    graphqlHTTP(async(request, response, graphQLParams) => ({
        schema: allSchema,
        graphiql: true
    }))
);

/**
 * Handle error
 */

// catch 404 and forward to error handle
app.use((req, res, next) => {
    next(createError(404));
})

// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //render the error page
    res.status(err.status || 500);
    res.render('error');
})

/**
 * Redis Server
 */

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


module.exports = app;

// ===========================================================================
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     if(req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
//     next();
// });

// ===========================================================================


// // Middleware:
// function logErrors(err, req, res, next) {
//     console.error(err.stack);
//     next(err);
// }

// function clientErrorHandler(err, req, res, next) {
//     if(req.xhr) {
//         res.status(500).send({error: 'Something failed!'});
//     } else {
//         next(err);
//     }
// }

// function errorHandler(err, req, res, next) {
//     res.status(500).send("Something broke");
// }