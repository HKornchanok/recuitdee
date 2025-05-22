const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const users = {};

app.use(bodyParser.json());

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
  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username].password === password) {
    const { firstName, lastName } = users[username];
    return res.json({ 
      message: 'Login successful',
      firstName,
      fullName: `${firstName} ${lastName}`
    });

    
  }

  res.status(401).json({ message: 'Invalid username or password' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
