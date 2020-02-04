import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux';

import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducers from './reducers/root-reducers';

const loggerMiddleware = createLogger()

export default function configureStore(preloadState) {
    return createStore(
        reducers,
        preloadState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    );
}

