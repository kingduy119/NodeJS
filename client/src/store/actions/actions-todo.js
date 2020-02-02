
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

// #Async-actions:
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    };
};

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export function invalidateSubreddit(subreddit) {
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    };
};

export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPosts(subreddit) {
    return {
      type: REQUEST_POSTS,
      subreddit
    };
};

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
};


function fetchPosts(subreddit) {
    // let requestBody = {
    //     query: `
    //         query {
    //             posts: ${subreddit}
    //         }
    //     `};
    return dispatch => {
        dispatch(requestPosts(subreddit));
        // return fetch(`https://localhost:1000/graphql`
        // , {
        //     method: 'POST',
        //     body: JSON.stringify(requestBody),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }}
        // )
            // .then(response => response.json())
            // .then(json => dispatch(receivePosts(subreddit, json)));
    };
}

const sub = {
    isFetching: false,
    didInvalidate: false
};

function shouldFetchPosts(state = {}, subreddit) {
    const posts = state.postsBySubreddit;
    if(!posts) {
        return true;
    } else if (posts.isFetching) {
        return false;
    } else {
        return posts.didInvalidate;
    }
}

export function fetchPostsIfNeeded(subreddit) {
    return (dispatch, getState) => {
        if(shouldFetchPosts(getState(), subreddit)) {
            return dispatch(fetchPosts(subreddit));
        } else {
            return Promise.resolve();
        }
    };
}