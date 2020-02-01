import {
    TypesActions,
    VisibilityFilters,
    SELECT_SUBREDDIT,
    INVALIDATE_SUBREDDIT,
    REQUEST_POSTS,
    RECEIVE_POSTS
} from '../actions/actions-todo';

const todos = (
    state = {
        filter: VisibilityFilters.SHOW_ALL,
        todos: []
    },
    action
) => {
    switch(action.type) {
        // #Todo-reducers:
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
        
        // #Filter-reducers:
        case TypesActions.SET_VISIBILITY_FILTER:
            if(state.filter !== action.filter)
                state =  Object.assign({}, state, {filter: action.filter});
            console.log(state);
            return state;

        // #Posts-reducers:
        case INVALIDATE_SUBREDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                [action.subreddit]: posts(state[action.subreddit], action)
            });

        default:
            return state;
    }
}

function posts(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: []
    },
    action
) {
    switch(action.type) {
        case INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, {
                didInvalidate: true
            });

        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });

        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            });

        default:
            return state;
    }
}


export default todos;