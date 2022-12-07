const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const postsRouter = require('./posts.js');
const commentsRouter = require('./comments.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);

module.exports = router;