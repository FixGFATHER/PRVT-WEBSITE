// models/Document.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  title:      { type: String, required: true },
  description:{ type: String },
  filePath:   { type: String, required: true },  // ggf. Pfad zur hochgeladenen Datei
  category:   { type: String },
  tags:       [{ type: String }],
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', documentSchema);
