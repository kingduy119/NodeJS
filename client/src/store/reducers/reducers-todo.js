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
            console.log(state);
            console.log(action);
            return [
                ...state.todos,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
        case TypesActions.TOGGLE_TODO:
            return state.todos.map(todo => 
                todo.id === action.id ?
                {...todo, completed: !todo.completed } : todo
            );
        default:
            return state;
    }
}

export default todos;