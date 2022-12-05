const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const postRouter = require('./posts.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/posts', postRouter);

module.exports = router;