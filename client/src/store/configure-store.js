import {
    createStore,
    combineReducers
} from 'redux';

// import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from 'redux-logger';

import todos from './reducers/reducers-todo';

// const middlewares = [thunkMiddleware, loggerMiddleware];
// const middlewareEnhancer = applyMiddleware(...middlewares);
// const enhancers = [middlewareEnhancer];

const store = createStore(
    todos
);


export default store;