// models/Feedback.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  user:     { type: Schema.Types.ObjectId, ref: 'User' },
  message:  { type: String, required: true },
  createdAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
