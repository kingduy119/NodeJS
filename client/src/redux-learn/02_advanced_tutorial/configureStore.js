import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import loggerMiddleware from './middleware/logger';
import monitorReducerEnhancer from './enhancers/monitorReducer';
import rootReducer from './reducers';

// import {createLogger} from 'redux-logger';
// const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
    const middlewares = [loggerMiddleware, thunkMiddleware];
    const middlewarEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewarEnhancer, monitorReducerEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);

    const store = createStore(rootReducer, preloadedState, composedEnhancers);

    // // !--- Hot reloading
    // if(process.env.NODE_ENV !== 'production' && module.hot) {
    //     module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
    // } // end ---!
    return store;
}


//// !--- Fitler: Simplifying Setup with Redux Toolkit
// import {  configureStore} from '@reduxjs/toolkit'
// import rootReduce from './reducers';
// const store = configureStore({
//     reducer: rootReducer
// })
// export default store;
