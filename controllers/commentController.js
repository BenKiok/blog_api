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
  let comment = new Comment(
    {
      username: req.body.username,
      content: req.body.content,
      timeCreated: req.body.timeCreated,
      post: req.params.id
    }
  );

  comment.save((err, newComment) => {
    if (err) {
      return next(err);
    }
    res.json(newComment);
  });
}

exports.delete_comment_delete = (req, res, next) => {
  Comment.findByIdAndDelete(req.params.id, (err, comment) => {
    if (err) {
      return next(err);
    }
    res.json(comment);
  })
}