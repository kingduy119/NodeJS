import { combineReducers } from 'redux';
import todos from './Todo';
import visibilityFilter from './VisibilityFilter';

export default combineReducers({
    todos,
    visibilityFilter
});