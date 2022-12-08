import { csrfFetch } from './csrf';

// GET ALL POSTS
const GET_POSTS = 'posts/GET_POSTS';
const getPosts = payload => {
    return {
        type: GET_POSTS,
        payload
    };
};
export const getAllPosts = () => async dispatch => {
    const res = await csrfFetch('/api/posts/');
    const payload = await res.json();
    dispatch(getPosts(payload));
};

// GET ALL POSTS FROM USER
const GET_POSTS_FROM_USER = 'posts/GET_POSTS_FROM_USER';
const getPostsFromUser = payload => {
    return {
        type: GET_POSTS_FROM_USER,
        payload
    };
};
export const getAllPostsFromUser = userId => async dispatch => {
    const res = await csrfFetch(`/api/posts/${userId}`);
    const payload = await res.json();
    dispatch(getPostsFromUser(payload));
};

// CREATE POST
const CREATE_POST = 'posts/CREATE_POST';
const createPost = payload => {
    return {
        type: CREATE_POST,
        payload
    };
};
export const createOnePost = ({ userId, image, caption }) => async dispatch => {
    const res = await csrfFetch('/api/posts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, image, caption })
    });
    const payload = await res.json();
    dispatch(createPost(payload));
};

// EDIT POST
const EDIT_POST = '/posts/EDIT_POST';
const editPost = payload => {
    return {
        type: EDIT_POST,
        payload
    };
};
export const editOnePost = ({ postId, caption }) => async dispatch => {
    const res = await csrfFetch('/api/posts/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postId, caption })
    });
    const payload = await res.json();
    dispatch(editPost(payload));
};

// DELETE POST
const DELETE_POST = '/posts/DELETE_POST';
const deletePost = payload => {
    return {
        type: DELETE_POST,
        payload
    };
};
export const deleteOnePost = postId => async dispatch => {
    await csrfFetch('/api/posts/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postId })
    })
    .then(dispatch(deletePost({ postId })));
};

// CREATE COMMENT
const CREATE_COMMENT = '/posts/CREATE_COMMENT';
const createComment = payload => {
    return {
        type: CREATE_COMMENT,
        payload
    };
};
export const createOneComment = ({ userId, postId, text }) => async dispatch => {
    const res = await csrfFetch('/api/comments/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, postId, text })
    });
    const payload = await res.json();
    dispatch(createComment(payload));
};

// EDIT COMMENT
const EDIT_COMMENT = '/posts/EDIT_COMMENT';
const editComment = payload => {
    return {
        type: EDIT_COMMENT,
        payload
    };
};
export const editOneComment = ({ commentId, text }) => async dispatch => {
    const res = await csrfFetch('/api/comments/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ commentId, text })
    });
    const payload = await res.json();
    dispatch(editComment(payload));
};

// DELETE COMMENT
const DELETE_COMMENT = '/posts/DELETE_COMMENT';
const deleteComment = payload => {
    return {
        type: DELETE_COMMENT,
        payload
    };
};
export const deleteOneComment = ({ postId, commentId }) => async dispatch => {
    await csrfFetch('/api/comments/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ commentId })
    })
    .then(dispatch(deleteComment({ postId, commentId })));
};

// LIKE POST
const LIKE_POST = '/posts/LIKE_POST';
const likePost = payload => {
    return {
        type: LIKE_POST,
        payload
    };
};
export const likeOnePost = ({ userId, postId }) => async dispatch => {
    const res = await csrfFetch('/api/likes/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, postId })
    });
    const payload = await res.json();
    dispatch(likePost(payload));
};

// UNLIKE POST
const UNLIKE_POST = '/posts/UNLIKE_POST';
const unlikePost = payload => {
    return {
        type: UNLIKE_POST,
        payload
    };
};
export const unlikeOnePost = ({ likeId, userId, postId }) => async dispatch => {
    await csrfFetch('/api/likes/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ likeId })
    })
    .then(dispatch(unlikePost({ userId, postId })));
};

const postReducer = (state={}, action) => {
    let newState = { ...state };

    switch (action.type) {
        case GET_POSTS:
        case GET_POSTS_FROM_USER:
            newState = action.payload;
            return { ...newState };

        case CREATE_POST:
            newState[action.payload.post.id] = action.payload;
            return { ...newState };

        case EDIT_POST:
            newState[action.payload.id].post = action.payload;
            return { ...newState };
        
        case DELETE_POST:
            delete newState[action.payload.postId];
            return { ...newState };

        case CREATE_COMMENT:
            newState[action.payload.comment.postId].comments[action.payload.comment.id] = action.payload;
            return { ...newState };

        case EDIT_COMMENT:
            newState[action.payload.postId].comments[action.payload.id].comment = action.payload;
            return { ...newState };
        
        case DELETE_COMMENT:
            delete newState[action.payload.postId].comments[action.payload.commentId];
            return { ...newState };

        case LIKE_POST:
            newState[action.payload.like.postId].likes[action.payload.like.userId] = action.payload;
            return { ...newState };

        case UNLIKE_POST:
            delete newState[action.payload.postId].likes[action.payload.userId];
            return { ...newState };

        default:
            return { ...state };
    };
};

export default postReducer;