const express = require('express');
const { User, Like } = require('../../db/models');

const router = express.Router();

router.post('/', async (req, res) => {
    const like = await Like.create(req.body);
    const liker = await User.findByPk(req.body.userId);
    return res.json({ like, liker });
});

router.delete('/', async (req, res) => {
    const unlike = await Like.findByPk(req.body.likeId);
    await unlike.destroy();
});

module.exports = router;