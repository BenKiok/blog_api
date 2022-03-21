const express = require('express');
const router = express.Router();

const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');

/* post routes */
router.post('/posts/new', post_controller.create_post_post);
router.put('/posts/:id/edit', post_controller.edit_post_put);
router.delete('/posts/:id/delete', post_controller.delete_post_delete);
router.put('/posts/:id/publish', post_controller.publish_post_put);
router.put('/posts/:id/unpublish', post_controller.unpublish_post_put);

/* comment routes */
router.delete('/comments/:id/delete', comment_controller.delete_comment_delete);

/* catch-all */
router.use('/*', (req, res) => {
  res.status(404).json('Request not found');
})

module.exports = router;