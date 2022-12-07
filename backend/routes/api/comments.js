const express = require('express');
const { User, Comment } = require('../../db/models');

const router = express.Router();

router.post('/', async (req, res) => {
    const newComment = await Comment.create(req.body);
    await newComment.save();
    const commentOwner = await User.findByPk(req.body.userId);
    return res.json({ data: newComment, commentOwner });
});

router.put('/', async (req, res) => {
    const { commentId, text } = req.body;
    const comment = await Comment.findByPk(commentId);
    await comment.update({ text });
    await comment.save();
    return res.json(comment);
});

router.delete('/', async (req, res) => {
    const comment = await Comment.findByPk(req.body.commentId);
    await comment.destroy();
});

module.exports = router;