import { csrfFetch } from './csrf';

// GET ALL POSTS
const GET_POSTS = 'posts/GET_POSTS';
const getPosts = posts => {
    return {
        type: GET_POSTS,
        posts
    };
};
export const getAllPosts = () => async dispatch => {
    const res = await csrfFetch('/api/posts/');
    const posts = await res.json();
    dispatch(getPosts(posts));
};

// GET ALL POSTS FROM USER
const GET_POSTS_FROM_USER = 'posts/GET_POSTS_FROM_USER';
const getPostsFromUser = posts => {
    return {
        type: GET_POSTS_FROM_USER,
        posts
    };
};
export const getAllPostsFromUser = userId => async dispatch => {
    const res = await csrfFetch(`/api/posts/${userId}`);
    const posts = await res.json();
    dispatch(getPostsFromUser(posts));
};

// CREATE POST
const CREATE_POST = 'posts/CREATE_POST';
const createPost = post => {
    return {
        type: CREATE_POST,
        post
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
    const post = await res.json();
    dispatch(createPost(post));
};

// EDIT POST
const EDIT_POST = '/posts/EDIT_POST';
const editPost = post => {
    return {
        type: EDIT_POST,
        post
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
    const post = await res.json();
    dispatch(editPost(post));
};

// DELETE POST
const DELETE_POST = '/posts/DELETE_POST';
const deletePost = postId => {
    return {
        type: DELETE_POST,
        postId
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
    .then(dispatch(deletePost(postId)));
};

// CREATE COMMENT
const CREATE_COMMENT = '/posts/CREATE_COMMENT';
const createComment = comment => {
    return {
        type: CREATE_COMMENT,
        comment
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
    const comment = await res.json();
    dispatch(createComment(comment));
};

// EDIT COMMENT
const EDIT_COMMENT = '/posts/EDIT_COMMENT';
const editComment = comment => {
    return {
        type: EDIT_COMMENT,
        comment
    };
};
export const editOneComment = ({ userId, commentId, text }) => async dispatch => {
    const res = await csrfFetch('/api/comments/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, commentId, text })
    });
    const comment = await res.json();
    dispatch(editComment(comment));
};

const DELETE_COMMENT = '/posts/DELETE_COMMENT';
const deleteComment = comment => {
    return {
        type: DELETE_COMMENT,
        comment
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

const postReducer = (state={}, action) => {
    let newState = { ...state };

    switch (action.type) {
        case GET_POSTS:
        case GET_POSTS_FROM_USER:
            newState = action.posts;
            return { ...newState };

        case CREATE_POST:
            newState[action.post.data.id] = action.post;
            return { ...newState };

        case EDIT_POST:
            newState[action.post.id]['data'] = action.post;
            return { ...newState };
        
        case DELETE_POST:
            delete newState[action.postId];
            return { ...newState };

        case CREATE_COMMENT:
            newState[action.comment.postId].comments[action.comment.id] = action.comment;
            return { ...newState };

        case EDIT_COMMENT:
            newState[action.comment.postId].comments[action.comment.id] = action.comment;
            return { ...newState };
        
        case DELETE_COMMENT:
            delete newState[action.comment.postId].comments[action.comment.commentId];
            return { ...newState };

        default:
            return { ...state };
    };
};

export default postReducer;