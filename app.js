// app.js
const express = require('express');
const app = express();
const connectDB = require('./config/database');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');

const User = require('./models/User');

// Datenbank verbinden
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session-Konfiguration
app.use(session({
  secret: 'geheimesessionkey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/mein-schulportal' }),
  cookie: { maxAge: 1000 * 60 * 60 * 6 } // 6 Stunden
}));

app.use(flash());

// Passport.js Initialisierung
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return done(null, false, { message: 'Ungültiger Benutzername' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return done(null, false, { message: 'Falsches Passwort' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// EJS als Template-Engine
app.set('view engine', 'ejs');

// Eigene Middlewares
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// Routen
const authRoutes = require('./routes/authRoutes');
const docRoutes = require('./routes/docRoutes');
const forumRoutes = require('./routes/forumRoutes');
const messageRoutes = require('./routes/messageRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// Startseite
app.get('/', (req, res) => {
  res.render('index'); // Landing Page
});

// Verwende die Teilrouten
app.use('/', authRoutes);
app.use('/documents', ensureAuth, docRoutes);
app.use('/forum', ensureAuth, forumRoutes);
app.use('/messages', ensureAuth, messageRoutes);
app.use('/feedback', ensureAuth, feedbackRoutes);
app.use('/analytics', ensureAuth, analyticsRoutes);

// Auth-Schutz
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash('error', 'Bitte einloggen, um fortzufahren.');
  res.redirect('/login');
}

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
