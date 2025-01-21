// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName:  { type: String, required: true },
  lastName:   { type: String, required: true },
  username:   { type: String, required: true, unique: true },
  password:   { type: String, required: true }
});

// Vor dem Speichern wird das Passwort gehasht
userSchema.pre('save', async function(next) {
  try {
    // Nur wenn das Passwortfeld neu/ geändert ist
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Vergleichen des eingegebenen Passworts beim Login
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
