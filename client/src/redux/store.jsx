import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


import user from './reducers/UserReducer';

export default createStore(
    combineReducers({
        user
    })
    ,{}
    ,applyMiddleware(logger, thunk)
);

