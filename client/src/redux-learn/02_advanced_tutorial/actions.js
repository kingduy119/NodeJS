

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';


// Here, the user can select a subreddit to display:
export function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}

// They can also press a “refresh” button to update it:
export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

// When it's time to fetch the posts for some subreddit, we will dispatch a REQUEST_POSTS action:
function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

// Finally, when the network request comes through, we will dispatch RECEIVE_POSTS:
function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}


// ========================================
// #1: Fetch
function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit));
    return fetch(`https://localhost:1000/graphql`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)) )
  }
}

// #2: ????
function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];
  if(!posts) { return true; }
  else if (posts.isFetching) { return false; }
  else { return posts.didInvalidate; }
}

// #3: ????
export function fetchPostsIfNeed(subreddit) {
  return (dispatch, getState) => {
    if(shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  }
}

























