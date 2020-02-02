import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducers from './reducers/root-reducers';


export default createStore(
    reducers,
    undefined,
    applyMiddleware(thunk)
);
