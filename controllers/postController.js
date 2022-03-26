const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { body, validationResult } = require('express-validator');
const async = require('async');

/* for blog site viewers */
exports.view_posts_get = (req, res, next) => {
  Post.find({ published: true }, (err, posts) => {
    if (err) {
      return next(err);
    }
    res.json(posts);
  });
}

exports.view_a_post_get = (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      return next(err);
    }
    res.json(post);
  });
}

/* for author */
exports.create_post_post = [
  body('title').notEmpty().trim().escape(),
  body('content').notEmpty().trim().escape(),
  body('timeCreated').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json(req.body);
    } else {
      let post = new Post(
        {
          title: req.body.title,
          content: req.body.content,
          time: {
            created: req.body.timeCreated
          },
          published: false
        }
      );

      post.save((err, newPost) => {
        if (err) {
          return next(err);
        }
        res.json(newPost);
      })
    }
  }
]

exports.edit_post_put = [
  body('title').notEmpty().trim().escape(),
  body('content').notEmpty().trim().escape(),
  body('timeEdited').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json(req.body);
    } else {
      let edits = {
        title: req.body.title,
        content: req.body.content,
        time: {
          edited: req.body.timeEdited
        }
      }

      Post.findByIdAndUpdate(req.params.id, edits, (err, post) => {
        if (err) {
          return next(err);
        }
        res.json(post);
      });
    }
  }
]

exports.delete_post_delete = (req, res, next) => {
  Comment.find({ post: req.params.id }, (err, comments) => {
    if (err) {
      return next(err);
    }
    
    let funcArr = [],
        func;
    
    comments.forEach(comment => {
      func = cb => {
        Comment.findByIdAndDelete(comment._id, (err, comment) => {
          if (err) {
            return next(err);
          }
          cb(null, comment);
        });
      }

      funcArr.push(func);
    });

    async.series([
        function(cb) {
          async.parallel(
            funcArr,
            cb
          )
        },
        function(cb) {
          Post.findByIdAndDelete(req.params.id, (err, post) => {
            if (err) {
              return next(err);
            }
            cb(null, post);
          });
        }
      ],
      function(err, results) {
        if (err) {
          return next(err);
        }
        
        res.json(results);
      }
    );
  });
}

exports.publish_post_put = (req, res, next) => {
  Post.findByIdAndUpdate(req.params.id, { published: true }, (err, post) => {
    if (err) {
      return next(err);
    }
    res.json(post);
  });
}

exports.unpublish_post_put = (req, res, next) => {
  Post.findByIdAndUpdate(req.params.id, { published: false }, (err, post) => {
    if (err) {
      return next(err);
    }
    res.json(post);
  });
}