const express = require('express');
const { User, Post, Comment } = require('../../db/models');

const router = express.Router();

router.get('/:userId/', async (req, res) => {
    const posts = await Post.findAll({ where: { userId: req.params.userId } });
    return res.json(posts);
});

router.post('/', async (req, res) => {
    const { userId, image, caption } = req.body;
    const newPost = await Post.create({ userId, image, caption });
    await newPost.save();

    return res.json(newPost);
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