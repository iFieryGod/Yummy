const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  }, 
  description: {
    type: String,
    required: true, 
    trim: true
  }
});

const Post = mongoose.model('Post', PostSchema)
module.exports = Post;