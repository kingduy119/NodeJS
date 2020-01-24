import {
    VisibilityFilters,
    TypesActions
} from '../actions/actions-todo';

const visibilityFilter = (
    state = VisibilityFilters.SHOW_ALL,
    action
) => {
    switch(action.type) {
        case TypesActions.SET_VISIBILITY_FILTER:
            return action.filter;
        default: return state;
    }
}

export default visibilityFilter;