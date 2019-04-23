const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  //Title of the post
  title: {
    type: String,
    required: true
  },
  //Email of the person who uploaded it
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  //Image URL
  image: {
    type: String,
    required: true
  }
});

module.exports = Post = mongoose.model("title", PostSchema);
