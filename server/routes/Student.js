const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../db');

// JWT secret here for development
const JWT_SECRET = 'wowkey';

// Middleware to check the JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied. Token not provided.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token.' });
    req.user = user;
    next();
  });
};

// GET all students (requires authentication)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const getAllStudentSQL = 'SELECT * FROM student';
    db.query(getAllStudentSQL, (err, results) => {
      if (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ error: 'An error occurred while fetching students.' });
      } else {
        res.json(results);
      }
    });
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ error: 'An error occurred while fetching students.' });
  }
});

// POST a new student (no authentication required for registration)
router.post('/', async (req, res) => {
  const { username, password, points } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const createStudentSQL = 'INSERT INTO student (username, password, points) VALUES (?, ?, ?)';
  const values = [username, password, points || null];

  db.query(createStudentSQL, values, (err, results) => {
    if (err) {
      console.error('Error creating student:', err);
      res.status(500).json({ error: 'An error occurred while creating the student.' });
    } else {
      res.json({ id: results.insertId });
    }
  });
});

// POST login for students
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const authenticateStudentSQL = 'SELECT * FROM student WHERE username = ? AND password = ?';
  const values = [username, password];

  db.query(authenticateStudentSQL, values, (err, results) => {
    if (err) {
      console.error('Error authenticating student:', err);
      res.status(500).json({ error: 'An error occurred while authenticating the student.' });
    } else {
      if (results.length > 0) {
        const accessToken = jwt.sign({ username: results[0].username }, JWT_SECRET);
        res.json({ accessToken, username: results[0].username, grade_id: results[0].grade_id, student_id: results[0].id });
      } else {
        res.status(401).json({ error: 'Invalid credentials.' });
      }
    }
  });
});

module.exports = router;
