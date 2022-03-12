const Post = require('../models/Post');

exports.view_posts_get = (req, res, next) => {
  Post.find({}, (err, posts) => {
    if (err) {
      return next(err);
    }
    res.json(posts);
  });
}