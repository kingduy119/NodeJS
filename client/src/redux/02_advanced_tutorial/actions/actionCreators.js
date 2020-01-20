

export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';
export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';

// ==> Before
// export function loadPosts(userId) {
//     return (dispatch, getState) => {
//         const { posts } = getState();
//         if(posts[userId]) { return; } // There is cached data! Don't do anything

//         dispatch({
//             type: 'LOAD_POST_REQUEST',
//             userId
//         });

//         fetch(`https://localhost:1000/graphql`).then(
//             response => dispatch({
//                 type: LOAD_POST_SUCCESS,
//                 userId,
//                 response
//             }),
//             error => dispatch({
//                 type: LOAD_POST_FAILURE,
//                 userId,
//                 error
//             })
//         )
//     }
// }

// ==> After
// Finally, You can write own middleware:
export function loadPosts(userId) {
    return {
        // types of actions to emit before and after
        types: [LOAD_POST_SUCCESS, LOAD_POST_FAILURE, LOAD_POST_REQUEST];
        // Check the cache (optional):
        shouldCallAPI: state => !state.posts[userId],
        // Perform the fetching:
        callAPI: () => fetch(`https:localhost:1000/graphql`),
        // Arguments to inject in begin/end actions
        payload: { userId }
    };
}

function callAPIMiddleware({dispatch, getState}) {
    return next => action => {
        const [
                types, callAPI,
                shouldCallAPI = () => true,
                payload = {}
            ] = action;
        
        if(!types) { return next(action); }
        if(
            !Array.isArray(types) ||
            types.length !== 3 ||
            !types.every(type => typeof type === 'string')
        ) {
            throw new Error('Expected an array of three string types.');
        }

        if(typeof callAPI !== 'function') {
            throw new Error('Expected callAPI to be a function.')
        }

        if(!shouldCallAPI(getState())) { return; }

        dispatch(
            Object.assign({}, payload, {
                type: LOAD_POST_REQUEST
            })
        );
        
        return callAPI().then(
            response => dispatch(
                Object.assign({}, payload, {
                    response,
                    type: LOAD_POST_SUCCESS
                })
            ),
            error => dispatch(
                Object.assign({}, payload, {
                    error,
                    type: LOAD_POST_FAILURE
                })
            )
        )
    }
}

// export function loadComments(postId) {
//     return {
//       types: [
//         'LOAD_COMMENTS_REQUEST',
//         'LOAD_COMMENTS_SUCCESS',
//         'LOAD_COMMENTS_FAILURE'
//       ],
//       shouldCallAPI: state => !state.comments[postId],
//       callAPI: () => fetch(`http://myapi.com/posts/${postId}/comments`),
//       payload: { postId }
//     }
//   }
//   export function addComment(postId, message) {
//     return {
//       types: [
//         'ADD_COMMENT_REQUEST',
//         'ADD_COMMENT_SUCCESS',
//         'ADD_COMMENT_FAILURE'
//       ],
//       callAPI: () =>
//         fetch(`http://myapi.com/posts/${postId}/comments`, {
//           method: 'post',
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ message })
//         }),
//       payload: { postId, message }
//     }
//   }

// =========

export function loadPostsSuccess(userId, response) {
    return {
        type: LOAD_POST_SUCCESS,
        userId,
        response
    };
}

export function loadPostsFailure(userId, error) {
    return {
        type: LOAD_POST_FAILURE,
        userId,
        error
    };
}

export function loadPostsRequest(userId) {
    return {
        type: LOAD_POST_REQUEST,
        userId
    };
}