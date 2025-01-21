// config/database.js
const mongoose = require('mongoose');

mongoose.set('strictQuery', false); // Unterdrückt nur die Mongoose-Warnung

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/meine-registrierung');
    console.log('MongoDB verbunden.');
  } catch (error) {
    console.error('MongoDB Verbindungsfehler:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
