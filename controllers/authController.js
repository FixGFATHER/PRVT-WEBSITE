// controllers/authController.js
const User = require('../models/User');
const passport = require('passport');

// Zeigt Registrierungsseite
exports.getRegister = (req, res) => {
  res.render('register');
};

// Registriert neuen User
exports.postRegister = async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      // Fehlerbehandlung, falls User schon existiert
      req.flash('error', 'Benutzername existiert bereits.');
      return res.redirect('/register');
    }
    const newUser = new User({ firstName, lastName, username, password });
    await newUser.save();
    req.flash('success', 'Registrierung erfolgreich! Bitte einloggen.');
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.redirect('/register');
  }
};

// Zeigt Login-Seite
exports.getLogin = (req, res) => {
  res.render('login');
};

// Führen den Login mit Passport durch
exports.postLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});

// Logout
exports.logout = (req, res) => {
  req.logout(() => {
    req.flash('success', 'Du hast dich erfolgreich ausgeloggt.');
    res.redirect('/login');
  });
};
