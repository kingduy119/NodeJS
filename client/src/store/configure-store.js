import {
    createStore,
    applyMiddleware
} from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducers from './reducers/root-reducers';

const store = createStore(
    reducers
    // reducers,
    // {},
    // applyMiddleware(logger, thunk, promise)
);


export default store;