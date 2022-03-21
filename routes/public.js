const express = require('express');
const router = express.Router();

const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');

/* post routes */
router.get('/posts', post_controller.view_posts_get);
router.get('/posts/:id', post_controller.view_a_post_get);

/* comment routes */
router.get('/posts/:id/comments', comment_controller.view_comments_get);
router.post('/posts/:id/comments/new', comment_controller.create_comment_post);

/* root */
router.get('/', (req, res) => {
  res.status(404).send('No resource found');
});

module.exports = router;