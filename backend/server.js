const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'howl@kornchanok.dev'; 

const users = {};

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

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

app.post('/auth', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    const { username } = decoded;
    if (!users[username] || users[username].currentToken !== token) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const { exp, iat, ...userData } = decoded;

    const refreshedToken = jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' });
    
    users[username].currentToken = refreshedToken;

    res.json({
      user: {
        username: userData.username,
        firstName: users[username].firstName,
        lastName: users[username].lastName
      },
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

  const user = { username, password, firstName, lastName };
  const token = jwt.sign({ username, firstName, lastName }, JWT_SECRET, { expiresIn: '1h' });

  users[username] = {
    password,
    firstName,
    lastName,
    currentToken: token
  };

  res.status(201).json({ 
    message: 'User registered successfully',
    user: {
      username,
      firstName,
      lastName
    },
    token
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username].password === password) {
    const { firstName, lastName } = users[username];
    const user = { username, password, firstName, lastName };
    
    const token = jwt.sign({ username, firstName, lastName }, JWT_SECRET, { expiresIn: '1h' });
    
    users[username].currentToken = token;
    
    return res.json({ 
      message: 'Login successful',
      user: {
        username,
        firstName,
        lastName
      },
      token
    });
  }

  res.status(401).json({ message: 'Invalid username or password' });
});

app.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
