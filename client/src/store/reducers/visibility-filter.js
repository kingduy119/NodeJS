import {
    VisibilityFilters,
    TypesActions
} from '../actions/actions-todo';

const initState = {
    filter: VisibilityFilters.SHOW_ALL,
    todos: []
}

const visibilityFilter = (
    state = initState,
    action
) => {
    switch(action.type) {
        case TypesActions.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

export default visibilityFilter;