
// import fetch from 'cross-fetch';

let nextTodoId = 0;

// #Todo:
export const TypesActions = {
    ADD_TODO: 'ADD_TODO',
    TOGGLE_TODO: 'TOGGLE_TODO',
    SET_VISIBILITY_FILTER: 'SET_VISIBILITY_FILTER'
};

export const addTodo = text => ({
    type: TypesActions.ADD_TODO,
    id: nextTodoId++,
    text: text
});

export const toggleTodo = id => ({
    type: TypesActions.TOGGLE_TODO,
    id
})

// #Filter:
export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const setVisibilityFilter = filter => ({
    type: TypesActions.SET_VISIBILITY_FILTER,
    filter
});


