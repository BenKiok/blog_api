const mongoose = require('mongoose');
const async = require('async');
require('dotenv').config();

const Post = require('./models/Post');
const Comment = require('./models/Comment');

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Database connected!");
})
.catch(err => console.log(err));

/* code runs here */
let posts = [];

async.series([
    pushPosts,
    pushComments
  ],
  function(err, results) {
    if (err) {
      console.log('Error: ' + err);
    }

    console.log('Database filled! Disconnecting from database');
    mongoose.connection.close();
  }
);

function pushPost(title, time, published, func) {
  let post = new Post(
    {
      title, 
      content: 'This is an article.',
      time: {
        created: time
      }, 
      published
    }
  );

  post.save((err, _post) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Created post ' + _post.title);
      posts.push(_post);
      func(null, _post)
    }
  });
}

function pushComment(username, time, post, func) {
  let comment = new Comment({
    username,
    timeCreated: time,
    content: 'This is a comment',
    post
  });

  comment.save((err, _comment) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Created comment for ' + post.title);
      func(null, _comment);
    }
  });
}

function pushPosts(func) {
  async.parallel([
      function(cb) {
        pushPost('Article 1', Date(), false, cb);
      },
      function(cb) {
        pushPost('Article 2', Date(), true, cb);
      },
      function(cb) {
        pushPost('Article 3', Date(), false, cb);
      },
      function(cb) {
        pushPost('Article 4', Date(), true, cb);
      },
      function(cb) {
        pushPost('Article 5', Date(), false, cb);
      },
      function(cb) {
        pushPost('Article 6', Date(), true, cb);
      },
      function(cb) {
        pushPost('Article 7', Date(), false, cb);
      },
      function(cb) {
        pushPost('Article 8', Date(), true, cb);
      },
      function(cb) {
        pushPost('Article 9', Date(), false, cb);
      },
      function(cb) {
        pushPost('Article 10', Date(), true, cb);
      }
    ],
    func
  );
}

function pushComments(func) {
  async.parallel([
      function(cb) {
        pushComment('User1', Date(), posts[1], cb);
      },
      function(cb) {
        pushComment('User69', Date(), posts[1], cb);
      },
      function(cb) {
        pushComment('User1', Date(), posts[3], cb);
      },
      function(cb) {
        pushComment('User1', Date(), posts[5], cb);
      },
      function(cb) {
        pushComment('User1', Date(), posts[7], cb);
      },
      function(cb) {
        pushComment('User69', Date(), posts[7], cb);
      },
      function(cb) {
        pushComment('User942', Date(), posts[7], cb);
      },
      function(cb) {
        pushComment('User01932', Date(), posts[7], cb);
      },
      function(cb) {
        pushComment('User942', Date(), posts[9], cb);
      },
      function(cb) {
        pushComment('User942', Date(), posts[9], cb);
      },
      function(cb) {
        pushComment('User1', Date(), posts[9], cb);
      },
    ],
    func
  );
}