const express = require('express');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const pool = require('./db'); // Correctly importing the pool

// Load environment variables
dotenv.config();

const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files (optional)
app.use(express.static(path.join(__dirname, 'client/build')));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Avoid filename collisions
  },
});

const upload = multer({ storage });

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use express-session to manage sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Enable CORS for your front-end
app.use(
  cors({
    origin: 'https://real-estate-frontend-npqr.onrender.com', // Your deployed front-end URL
    credentials: true,
  })
);

// Parse incoming request bodies
app.use(express.json());

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        displayName: profile.displayName,
        emails: profile.emails,
        role: profile.emails[0].value === 'sincerelysingh@gmail.com' ? 'admin' : 'regular',
      };
      return done(null, user);
    }
  )
);

// Serialize and Deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.get('/', (req, res) => {
  res.send(
    'Backend server is running, but this server only handles authentication. Visit the React app on https://real-estate-frontend-npqr.onrender.com.'
  );
});

// Google OAuth login route
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
app.get('/auth/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('https://real-estate-frontend-npqr.onrender.com'); // ('https://real-estate-frontend-npqr.onrender.com/profile')
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
    },
  });
});

// Logout route
app.get('/logout', (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('https://real-estate-frontend-npqr.onrender.com/'); // Your front-end URL
  });
});

// Mortgage calculator page route
app.get('/mortgage-calculator', (req, res) => {
  res.render('index');
});

// Blog routes
app.post('/api/blogs', upload.single('image'), async (req, res) => {
  const { title, content, summary } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    await pool.query(
      'INSERT INTO blogs (title, content, summary, image_url, author, created_at) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)',
      [title, content, summary, image_url, 'Admin']
    );
    res.status(201).send('Blog created successfully');
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/blogs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).send('Server error');
  }
});

app.get('/api/blogs/:id', async (req, res) => {
  const blogId = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [blogId]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching blog:', err);
    res.status(500).send('Server error');
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM blogs WHERE id = $1', [id]);
    res.status(200).send('Blog deleted');
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).send('Server error');
  }
});

// Property routes
app.get('/api/properties', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM properties');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).send('Server error');
  }
});

app.post('/api/properties', upload.single('image'), async (req, res) => {
  const { title, location, price } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    await pool.query(
      'INSERT INTO properties (title, location, price, image_url) VALUES ($1, $2, $3, $4)',
      [title, location, price, image_url]
    );
    res.status(201).send('Property created successfully');
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).send('Server error');
  }
});

app.delete('/api/properties/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM properties WHERE id = $1', [id]);
    res.status(200).send('Property deleted');
  } catch (err) {
    console.error('Error deleting property:', err);
    res.status(500).send('Server error');
  }
});

// Fallback route for serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5002; // Use the environment variable PORT or fall back to 5002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

