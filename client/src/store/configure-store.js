import {
    createStore,
    combineReducers
} from 'redux';

// import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from 'redux-logger';

import todos from './reducers/reducers-todo';
import visibilityFilter from './reducers/visibility-filter';

// const middlewares = [thunkMiddleware, loggerMiddleware];
// const middlewareEnhancer = applyMiddleware(...middlewares);
// const enhancers = [middlewareEnhancer];

const store = createStore(
    // combineReducers(
    //     todos
    //     ,visibilityFilter
    // )
    todos
);


export default store;