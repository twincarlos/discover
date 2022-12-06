// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllPostsFromUser, createOnePost, editOnePost, deleteOnePost } from '../../store/post';

export default function Profile () {
    // const dispatch = useDispatch();
    // const [isLoaded, setIsLoaded] = useState(false);

    // const sessionUser = useSelector(state => state.session.user);
    // const posts = Object.values(useSelector(state => state.posts));

    // const [caption, setCaption] = useState('');
    // const [image, setImage] = useState('');

    // useEffect(() => {
    //     (async () => await dispatch(getAllPostsFromUser(sessionUser.id)).then(() => setIsLoaded(true)))();
    // }, [dispatch]);

    // if (!isLoaded) return null;

    // const createPost = () => dispatch(createOnePost({ userId: sessionUser.id, image, caption }));
    // const editPost = postId => dispatch(editOnePost({ postId, caption }));
    // const deletePost = postId => dispatch(deleteOnePost(postId));

    return <h1>Profile</h1>;
};