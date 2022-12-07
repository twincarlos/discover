const express = require('express');
const { User, Post, Comment } = require('../../db/models');

const router = express.Router();

function postsData (posts) {
    const data = {};
    for (let post of posts) {
        const comments = {};
        for (let comment of post.comments) comments[comment.id] = comment;
        data[post.id] = {
            data: post,
            postOwner: post.postOwner,
            comments
        };
    };
    return data;
};

// GET ALL POSTS
router.get('/', async (req, res) => {
    const posts = await Post.findAll({ include: [{ model: User, as: 'postOwner' }, { model: Comment, as: 'comments', include: { model: User, as: 'commentOwner' } }] });
    return res.json(postsData(posts));
});

// GET ALL POSTS FROM USER
router.get('/:userId/', async (req, res) => {
    const posts = await Post.findAll({ where: { userId: req.params.userId }, include: [{ model: User, as: 'postOwner' }, { model: Comment, as: 'comments', include: { model: User, as: 'commentOwner' } }] });
    return res.json(postsData(posts));
});

router.post('/', async (req, res) => {
    const newPost = await Post.create(req.body);
    await newPost.save();

    return res.json({ data: newPost, user: await User.findByPk(req.body.userId), comments: {} });
});

router.put('/', async (req, res) => {
    const { postId, caption } = req.body;
    const post = await Post.findByPk(postId);
    await post.update({ caption });
    await post.save();
    return res.json(post);
});

router.delete('/', async (req, res) => {
    const post = await Post.findByPk(req.body.postId);
    await post.destroy();
});

module.exports = router;