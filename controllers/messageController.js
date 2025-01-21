// controllers/messageController.js
const Message = require('../models/Message');
const User = require('../models/User');

exports.getMessages = async (req, res) => {
  try {
    // Zeigt alle Nachrichten, die an den eingeloggten User gesendet wurden
    const inbox = await Message.find({ receiver: req.user._id }).populate('sender');
    // Gesendete Nachrichten
    const outbox = await Message.find({ sender: req.user._id }).populate('receiver');
    res.render('messages', { inbox, outbox });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};

exports.postMessage = async (req, res) => {
  try {
    const { receiverUsername, content } = req.body;
    // Empfänger suchen
    const receiverUser = await User.findOne({ username: receiverUsername });
    if (!receiverUser) {
      req.flash('error', 'Empfänger nicht gefunden.');
      return res.redirect('/messages');
    }
    const msg = new Message({
      sender: req.user._id,
      receiver: receiverUser._id,
      content
    });
    await msg.save();
    res.redirect('/messages');
  } catch (err) {
    console.error(err);
    res.redirect('/messages');
  }
};
