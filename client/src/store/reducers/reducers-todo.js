import { TypesActions, VisibilityFilters } from '../actions/actions-todo';

const initState = {
    filter: VisibilityFilters.SHOW_ALL,
    todos: []
}

const todos = (
        state = initState,
        action
    ) => {
    switch(action.type) {
        case TypesActions.ADD_TODO:
            // console.log(state);
            // console.log(action);
            return Object.assign({}, state, {
                todos: [
                    ...state.todos,
                    {
                        id: action.id,
                        text: action.text,
                        completed: false
                    }
                ]
            })
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
        default:
            return state;
    }
}

export default todos;