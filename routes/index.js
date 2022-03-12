const express = require('express');
const router = express.Router();

const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');

router.get('/posts', post_controller.view_posts_get);

router.get('/', (req, res) => {
  res.redirect('/posts');
});

module.exports = router;