
import { combineReducers } from 'redux';
import todos from './reducers-todo';
import filter from './visibility-filter';

// Async-action
import posts from "./reducer-async";

export default combineReducers({
    todos,
    filter,
    posts
});


