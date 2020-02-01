import {
    VisibilityFilters,
    TypesActions
} from '../actions/actions-todo';

const visibilityFilter = (
    state = {
        filter: VisibilityFilters.SHOW_ALL,
        todos: []
    },
    action
) => {
    console.log(state.filter);
    switch(action.type) {
        case TypesActions.SET_VISIBILITY_FILTER:
            if(state.filter !== action.filter)
                state =  Object.assign({}, state, {filter: action.filter});
            console.log(state);
            return state;
        default:
            return state;
    }
};

export default visibilityFilter;