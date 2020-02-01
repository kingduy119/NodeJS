import { TypesActions, VisibilityFilters } from '../actions/actions-todo';

const todos = (
    state = {
        filter: VisibilityFilters.SHOW_ALL,
        todos: []
    },
    action
) => {
    switch(action.type) {
        case TypesActions.ADD_TODO:
            return Object.assign({}, state, {
                todos: [
                    ...state.todos,
                    {
                        id: action.id,
                        text: action.text,
                        completed: false
                    }
                ]
            });
        case TypesActions.TOGGLE_TODO:
            return Object.assign({}, state, {
                todos: state.todos.map((todo, index) => {
                    if(index === action.id)
                        return Object.assign({}, todo, {
                            completed: !todo.completed
                        });
                    else
                        return todo;
                })
            });
        // case TypesActions.SET_VISIBILITY_FILTER:
        //     if(state.filter !== action.filter)
        //         state =  Object.assign({}, state, {filter: action.filter});
        //     console.log(state);
        //     return state;
        default:
            return state;
    }
}

export default todos;