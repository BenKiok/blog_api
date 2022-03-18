const Comment = require('../models/Comment');

exports.view_comments_get = (req, res, next) => {
  Comment.find({ post: req.params.id }, (err, comments) => {
    if (err) {
      return next(err);
    }
    res.json(comments);
  });
}

exports.create_comment_post = (req, res, next) => {
  res.json('Create comment post route undefined');
}

exports.delete_comment_delete = (req, res, next) => {
  res.json('Delete comment post route undefined');
}