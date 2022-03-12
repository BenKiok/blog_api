const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  time: {
    created: { type: String, required: true },
    published: { type: String },
    edited: { type: String }
  },
  published: { type: Boolean, required: true }
});

postSchema.virtual('url').get(() => {
  return '/post/' + this._id;
});

module.exports = mongoose.model('Post', postSchema);