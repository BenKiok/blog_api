const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: String, required: true },
  timeCreated: { type: String, required: true },
  username: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
});

commentSchema.virtual('url').get(() => {
  return '/comment/' + this._id;
});

module.exports = mongoose.model('Comment', commentSchema);