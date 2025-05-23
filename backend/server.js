const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

const users = {};

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:4200', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// New auth route to verify and refresh token
app.post('/auth', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // Remove exp and iat from the decoded token
    const { exp, iat, ...userData } = decoded;

    // Generate new token with fresh expiration
    const refreshedToken = jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      user: userData,
      token: refreshedToken
    });
  });
});

app.post('/register', (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  if (!username || !password || !firstName || !lastName) {
    return res.status(400).json({ message: 'Username, password, first name, and last name are required' });
  }

  if (users[username]) {
    return res.status(400).json({ message: 'User already exists' });
  }

  users[username] = {
    password,
    firstName,
    lastName
  };

  const user = { username, firstName, lastName };
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });

  res.status(201).json({ 
    message: 'User registered successfully',
    user,
    token
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username].password === password) {
    const { firstName, lastName } = users[username];
    const user = { username, firstName, lastName };
    
    // Generate JWT token
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
    
    return res.json({ 
      message: 'Login successful',
      user,
      token
    });
  }

  res.status(401).json({ message: 'Invalid username or password' });
});

// Protected route example
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
