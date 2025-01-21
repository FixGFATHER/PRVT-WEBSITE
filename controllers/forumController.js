// controllers/forumController.js
const ForumThread = require('../models/ForumThread');

exports.getForumThreads = async (req, res) => {
  try {
    const threads = await ForumThread.find({}).populate('author').sort({ createdAt: -1 });
    res.render('forum', { threads });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};

exports.postNewThread = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newThread = new ForumThread({
      title,
      content,
      author: req.user._id
    });
    await newThread.save();
    res.redirect('/forum');
  } catch (err) {
    console.error(err);
    res.redirect('/forum');
  }
};

exports.postReply = async (req, res) => {
  try {
    const { threadId, replyContent } = req.body;
    const thread = await ForumThread.findById(threadId);
    thread.replies.push({
      content: replyContent,
      author: req.user._id
    });
    await thread.save();
    res.redirect('/forum');
  } catch (err) {
    console.error(err);
    res.redirect('/forum');
  }
};
