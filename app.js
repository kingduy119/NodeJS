const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const isAuth = require('./middleware/is-auth');

const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/books');

app.use(morgan('dev'));
app.use('/upload', express.static('upload'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// GraphQL
// ===========================================================================
const graphiqlHttp = require('express-graphql');
const graphQlSchema = require('./graphql/schema/indexSchema');
const graphQlResolver = require('./graphql/resolvers/indexResolver');

app.use(isAuth);
app.use('/graphql',
    graphiqlHttp({
        schema: graphQlSchema,
        rootValue: graphQlResolver,
        graphiql: true
    })
);
// ===========================================================================

// Set up:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Router handle:
app.use('/user', userRoutes);
app.use('/book', bookRoutes);


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

