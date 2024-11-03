const express = require('express');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
const db = require('./db');
const multer = require('multer');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express(); // Initialize the app here

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files (optional, in case you need this)
app.use(express.static(path.join(__dirname, 'public')));

// Set up multer for file storage (moved above the usage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Avoid filename collisions
  },
});

const upload = multer({ storage: storage });

// Serve uploaded images statically (make sure 'uploads/' exists and is accessible)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use express-session to manage sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: 'http://localhost:3000',  // Ensure the correct frontend URL
  credentials: true  // Allow credentials (cookies)
}));

// Parse incoming request bodies (for JSON data)
app.use(express.json()); // This middleware parses incoming requests with JSON payloads

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_REDIRECT_URI,
},
function (accessToken, refreshToken, profile, done) {
  const user = {
    displayName: profile.displayName,
    emails: profile.emails,
    role: profile.emails[0].value === 'sincerelysingh@gmail.com' ? 'admin' : 'regular',
  };
  return done(null, user);
}
));

// Serialize and Deserialize user into session
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.get('/', (req, res) => {
  res.send('Backend server is running, but this server only handles authentication. Visit the React app on http://localhost:3000.');
});

// Google OAuth login route
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
app.get('/auth/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('http://localhost:3000/profile');
});

// Profile route
app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/google');
  }
  res.send(`<h1>Welcome ${req.user.displayName}</h1><a href="/logout">Logout</a>`);
});

// Check current user
app.get('/api/current_user', (req, res) => {
  if (!req.user) {
    return res.json({ user: null });
  }
  res.json({
    user: {
      name: req.user.displayName,
      emails: req.user.emails,
      role: req.user.role,
    }
  });
});

app.get('/logout', (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('http://localhost:3000/');  // Redirect to the frontend after logout
  });
});

// Route for serving the mortgage calculator page
app.get('/mortgage-calculator', (req, res) => {
  res.render('index'); // Render the EJS template named 'mortgage-calculator.ejs'
});

// POST: Create a new blog with image upload
app.post('/api/blogs', upload.single('image'), async (req, res) => {
  const { title, content, summary } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    await db.none(
      'INSERT INTO blogs (title, content, summary, image_url, author, created_at) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)',
      [title, content, summary, image_url, 'Admin']
    );
    res.status(201).send('Blog created successfully');
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).send('Server error');
  }
});

// GET: Fetch all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await db.any('SELECT * FROM blogs');
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Fetch a single blog by ID
app.get('/api/blogs/:id', async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await db.one('SELECT * FROM blogs WHERE id = $1', [blogId]);
    res.json(blog);
  } catch (err) {
    console.error('Error fetching blog:', err);
    res.status(500).send('Server error');
  }
});

// Delete a blog
app.delete('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.none('DELETE FROM blogs WHERE id = $1', [id]);
    res.status(200).send('Blog deleted');
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).send('Server error');
  }
});

// GET: Fetch all properties
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await db.any('SELECT * FROM properties');
    res.json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST: Create a new property
app.post('/api/properties', upload.single('image'), async (req, res) => {
  const { title, location, price } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    await db.none(
      'INSERT INTO properties (title, location, price, image_url) VALUES ($1, $2, $3, $4)',
      [title, location, price, image_url]
    );
    res.status(201).send('Property created successfully');
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).send('Server error');
  }
});

// DELETE: Remove a property
app.delete('/api/properties/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.none('DELETE FROM properties WHERE id = $1', [id]);
    res.status(200).send('Property deleted');
  } catch (err) {
    console.error('Error deleting property:', err);
    res.status(500).send('Server error');
  }
});

// Start the server
const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
