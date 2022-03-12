const express = require('express');
const router = express.Router();

const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');

/* post routes */
router.get('/posts', post_controller.view_posts_get);
router.get('/post/:id', post_controller.view_a_post_get);
router.get('/post/new', post_controller.create_post_get);
router.post('/post/new', post_controller.create_post_post);
router.get('/post/:id/edit', post_controller.edit_post_get);
router.put('/post/:id/edit', post_controller.edit_post_put);
router.get('/post/:id/delete', post_controller.delete_post_get);
router.delete('/post/:id/delete', post_controller.delete_post_delete);
router.put('/post/:id/publish', post_controller.publish_post_put);
router.put('/post/:id/unpublish', post_controller.unpublish_post_put);

/* comment routes */
router.get('/post/:id/comments', comment_controller.view_comments_get);
router.post('/post/:id/comment/new', comment_controller.create_comment_post);
router.delete('/post/:id/comment/:id/delete', comment_controller.delete_comment_delete);

/* root */
router.get('/', (req, res) => {
  res.redirect('/posts');
});

module.exports = router;