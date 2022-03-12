const Post = require('../models/Post');

/* for blog site viewers */
exports.view_posts_get = (req, res, next) => {
  Post.find({}, (err, posts) => {
    if (err) {
      return next(err);
    }
    res.json(posts);
  });
}

exports.view_a_post_get = (req, res, next) => {
  res.json('View post get route undefined')
}

/* for author */
exports.create_post_get = (req, res, next) => {
  res.json('Create post get route undefined');
}

exports.create_post_post = (req, res, next) => {
  res.json('Create post post route undefined');
}

exports.edit_post_get = (req, res, next) => {
  res.json('Edit post get route undefined');
}

exports.edit_post_put = (req, res, next) => {
  res.json('Edit post post route undefined');
}

exports.delete_post_get = (req, res, next) => {
  res.json('Delete post get route undefined');
}

exports.delete_post_delete = (req, res, next) => {
  res.json('Delete post post route undefined');
}

exports.publish_post_put = (req, res, next) => {
  res.json('Publish post post route undefined');
}

exports.unpublish_post_put = (req, res, next) => {
  res.json('Unpublish post post route undefined');
}