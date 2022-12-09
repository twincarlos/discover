import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getAllPosts, createOnePost, editOnePost, deleteOnePost,
    createOneComment, editOneComment, deleteOneComment, likeOnePost, unlikeOnePost
} from '../../store/post';

export default function Home () {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const sessionUser = useSelector(state => state.session.user);
    const posts = useSelector(state => state.posts);

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        (async () => await dispatch(getAllPosts()).then(() => setIsLoaded(true)))();
    }, [dispatch, sessionUser.id]);

    if (!isLoaded) return null;

    const createPost = () => dispatch(createOnePost({ userId: sessionUser.id, image, caption }));
    const editPost = postId => dispatch(editOnePost({ postId, caption }));
    const deletePost = postId => dispatch(deleteOnePost(postId));
    const likePost = postId => dispatch(likeOnePost({ userId: sessionUser.id, postId }));
    const unlikePost = (likeId, postId) => dispatch(unlikeOnePost({ likeId, userId: sessionUser.id, postId }));

    const createComment = postId => dispatch(createOneComment({ userId: sessionUser.id, postId, text: caption }));
    const editComment = commentId => dispatch(editOneComment({ userId: sessionUser.id, commentId, text: caption }));
    const deleteComment = (postId, commentId) => dispatch(deleteOneComment({ postId, commentId }));

    return (
        <>
            <button onClick={() => createPost()}>CREATE</button>
            <input placeholder='caption' type='text' value={caption} onChange={e => setCaption(e.target.value)}></input>
            <input placeholder='image' type='text' value={image} onChange={e => setImage(e.target.value)}></input>
            {
                Object.values(posts).map(post => (
                    <div style={{ border: '1px solid black', margin: 10 }} key={post.post.id}>
                        <img src={post.post.image} style={{ width: 300 }}/>
                        <p>{post.post.caption}</p>
                        <button onClick={() => createComment(post.post.id)}>COMMENT</button>
                        <button onClick={() => editPost(post.post.id)}>EDIT</button>
                        <button onClick={() => deletePost(post.post.id)}>DELETE</button>
                        { sessionUser.id in post.likes ?
                            <button onClick={() => unlikePost(post.likes[sessionUser.id].like.id, post.post.id)}>UNLIKE</button>
                            : <button onClick={() => likePost(post.post.id)}>LIKE</button> }
                        <div>
                            {
                                Object.values(post.comments).map(comment => (
                                    <div key={comment.comment.id}>
                                        <p>{comment.commentOwner.username}: {comment.comment.text}</p>
                                        <button onClick={() => editComment(comment.comment.id)}>EDIT</button>
                                        <button onClick={() => deleteComment(post.post.id, comment.comment.id)}>DELETE</button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </>
    );
};