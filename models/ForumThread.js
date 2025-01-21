// models/ForumThread.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forumThreadSchema = new Schema({
  title:    { type: String, required: true },
  content:  { type: String, required: true },
  author:   { type: Schema.Types.ObjectId, ref: 'User' },
  replies:  [
    {
      content:  String,
      author:   { type: Schema.Types.ObjectId, ref: 'User' },
      createdAt:{ type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ForumThread', forumThreadSchema);
