
import { combineReducers } from 'redux';
import todos from './reducers-todo';
import filter from './visibility-filter';

export default combineReducers({
    todos,
    filter
});

// export default todosReducers;