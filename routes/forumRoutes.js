// routes/forumRoutes.js
const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

// Forum-Übersicht
router.get('/', forumController.getForumThreads);
router.post('/new', forumController.postNewThread);
router.post('/reply', forumController.postReply);

module.exports = router;
