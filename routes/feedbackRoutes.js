// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.get('/', feedbackController.getFeedbackForm);
router.post('/', feedbackController.postFeedback);

module.exports = router;
