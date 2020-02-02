
import { combineReducers } from 'redux';
import todosReducers from './reducers-todo';
import filterReducers from './visibility-filter';

// export default combineReducers({
//     todosReducers,
//     filterReducers
// });

export default todosReducers;