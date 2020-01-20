import qs from 'qs';
import path from 'path'
import Express from 'express';

import React from 'react';
import {
    renderToString
} from 'react-dom/server';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counterApp from '../02_advanced_tutorial/reducers';
import App from '../02_advanced_tutorial/containers/AsyncApp';

// API
import { fetchCounter }  from './api/counter';

const app = Express();
const port = 3000;

// Serve static files
app.use('./static', Express.static('static'));

// This is fired every time the server side receives a request
app.use(handleRender);

// !-------------- Handle request:
function handleRender(req, res){

    fetchCounter(apiResult => {
        // Read the counter from the request, if provided
        const prams = qs.parse(req.query);
        const counter = parseInt(params.counter, 10) || apiResult || 0;

        // Compile an initial state
        let preloadedState = { counter };

        // Create a new Redux store instance
        const store = createStore(counterApp);

        // Render to component to a string
        const html = renderToString(
            <Provider store={store}>
                <App/>
            </Provider>
        );
    });

    const preloadedState = store.getState();

    res.send(renderFullPage(html, preloadedState));
}

// !-------------- Render Full Page:
function renderFullPage(html, preloadedState) {
    return `
        <!doctype html>
        <html>
        <head>
            <title>Redux Universal Example</title>
        </head>
        <body>
            <div id="root">${html}</div>
            <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // https://redux.js.org/recipes/server-rendering/#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
                /</g,
                '\\u003c'
            )}
            </script>
            <script src="/static/bundle.js"></script>
        </body>
        </html>
    `;
}

app.listen(port);



