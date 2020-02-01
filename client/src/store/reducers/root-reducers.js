
import { combineReducers } from 'redux';
import todosReducers from './reducers-todo';
import filterReducers from './visibility-filter';

const reducers = {
    todos: todosReducers,
    filter: filterReducers
}

// export default combineReducers(reducers);
export default todosReducers;