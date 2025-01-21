// controllers/feedbackController.js
const Feedback = require('../models/Feedback');

exports.getFeedbackForm = (req, res) => {
  res.render('feedback');
};

exports.postFeedback = async (req, res) => {
  try {
    const { message } = req.body;
    const fb = new Feedback({
      user: req.user._id,
      message
    });
    await fb.save();
    req.flash('success', 'Feedback wurde gespeichert!');
    res.redirect('/feedback');
  } catch (err) {
    console.error(err);
    res.redirect('/feedback');
  }
};
