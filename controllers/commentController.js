const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { body, validationResult } = require('express-validator');

exports.view_comments_get = (req, res, next) => {
  Comment.find({ post: req.params.id }, (err, comments) => {
    if (err) {
      return next(err);
    }
    res.json(comments);
  });
}

exports.create_comment_post = [
  body('username').notEmpty().trim().escape(),
  body('content').notEmpty().trim().escape(),
  body('timeCreated').notEmpty().trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      res.json(req.body);
    } else {
      Post.findById(req.params.id, (err, post) => {
        if (err) {
          return next(err);
        } else if (!post.published) {
          res.json('Invalid request.');
        } else {
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
      });
    }
  }
]

exports.delete_comment_delete = (req, res, next) => {
  Comment.findByIdAndDelete(req.params.id, (err, comment) => {
    if (err) {
      return next(err);
    }
    res.json(comment);
  })
}