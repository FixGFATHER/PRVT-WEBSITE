// models/Message.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender:   { type: Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: Schema.Types.ObjectId, ref: 'User' },
  content:  { type: String, required: true },
  createdAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
