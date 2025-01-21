// controllers/analyticsController.js
const User = require('../models/User');
const Document = require('../models/Document');
const ForumThread = require('../models/ForumThread');
const Feedback = require('../models/Feedback');

exports.getAnalytics = async (req, res) => {
  try {
    const userCount = await User.countDocuments({});
    const docCount = await Document.countDocuments({});
    const forumCount = await ForumThread.countDocuments({});
    const feedbackCount = await Feedback.countDocuments({});

    res.render('analytics', { userCount, docCount, forumCount, feedbackCount });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};
