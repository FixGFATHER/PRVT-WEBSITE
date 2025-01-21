// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Private Nachrichten
router.get('/', messageController.getMessages);
router.post('/send', messageController.postMessage);

module.exports = router;
