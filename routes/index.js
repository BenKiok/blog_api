const express = require('express');
const router = express.Router();

const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');
const user_controller = require('../controllers/userController');

/* post routes */
router.get('/posts', post_controller.view_posts_get);
router.get('/posts/:id', post_controller.view_a_post_get);
router.get('/posts/new', post_controller.create_post_get);
router.post('/posts/new', post_controller.create_post_post);
router.get('/posts/:id/edit', post_controller.edit_post_get);
router.put('/posts/:id/edit', post_controller.edit_post_put);
router.get('/posts/:id/delete', post_controller.delete_post_get);
router.delete('/posts/:id/delete', post_controller.delete_post_delete);
router.put('/posts/:id/publish', post_controller.publish_post_put);
router.put('/posts/:id/unpublish', post_controller.unpublish_post_put);

/* comment routes */
router.get('/posts/:id/comments', comment_controller.view_comments_get);
router.post('/posts/:id/comments/new', comment_controller.create_comment_post);
router.delete('/comments/:id/delete', comment_controller.delete_comment_delete);

/* user routes */
router.post('/user/login', user_controller.login_user_post);
router.post('/user/logout', user_controller.logout_user_post);

/* root */
router.get('/', (req, res) => {
  res.status(404).send('No resource found');
});

module.exports = router;