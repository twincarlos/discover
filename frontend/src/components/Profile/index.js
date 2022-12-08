import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getAllPostsFromUser, createOnePost, editOnePost, deleteOnePost,
    createOneComment, editOneComment, deleteOneComment
} from '../../store/post';

export default function Profile () {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const sessionUser = useSelector(state => state.session.user);
    const posts = Object.values(useSelector(state => state.posts));

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        (async () => await dispatch(getAllPostsFromUser(sessionUser.id)).then(() => setIsLoaded(true)))();
    }, [dispatch]);

    if (!isLoaded) return null;

    const createPost = () => dispatch(createOnePost({ userId: sessionUser.id, image, caption }));
    const editPost = postId => dispatch(editOnePost({ postId, caption }));
    const deletePost = postId => dispatch(deleteOnePost(postId));

    const createComment = postId => dispatch(createOneComment({ userId: sessionUser.id, postId, text: caption }));
    const editComment = commentId => dispatch(editOneComment({ userId: sessionUser.id, commentId, text: caption }));
    const deleteComment = (postId, commentId) => dispatch(deleteOneComment({ postId, commentId }));

    return (
        <>
            <button onClick={() => createPost()}>CREATE</button>
            <input placeholder='caption' type='text' value={caption} onChange={e => setCaption(e.target.value)}></input>
            <input placeholder='image' type='text' value={image} onChange={e => setImage(e.target.value)}></input>
            {
                posts.map(post => (
                    <div style={{ border: '1px solid black', margin: 10 }} key={post.data.id}>
                        <img src={post.data.image} style={{ width: 300 }}/>
                        <p>{post.data.caption}</p>
                        <button onClick={() => createComment(post.data.id)}>COMMENT</button>
                        <button onClick={() => editPost(post.data.id)}>EDIT</button>
                        <button onClick={() => deletePost(post.data.id)}>DELETE</button>
                        <div>
                            {
                                Object.values(post.comments).map(comment => (
                                    <div key={comment.id}>
                                        <p>{comment.commentOwner.username}: {comment.text}</p>
                                        <button onClick={() => editComment(comment.id)}>EDIT</button>
                                        <button onClick={() => deleteComment(post.data.id, comment.id)}>DELETE</button>
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