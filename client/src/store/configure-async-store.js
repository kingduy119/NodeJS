import {
    createStore, applyMiddleware
} from 'redux';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducers from '../reducers/reducer-async';

const loggerMiddleware = createLogger();

export default function configureStore(preloadState) {
    return createStore(
        rootReducers,
        preloadState,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    );
}


