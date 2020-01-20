import React from 'react';
import { hydrate } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counterApp from '../02_advanced_tutorial/reducers';
import App from '../02_advanced_tutorial/containers/AsyncApp';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with innitial state
const store = createStore(counterApp, preloadedState);

hydrate(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

