const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../db');

// get marks based on student and subject
router.get('/:student_id/:subject_id', async (req, res) => {
  const subject_id = req.params.subject_id;
  const student_id = req.params.student_id;
  try {
    const getMarks = 'SELECT id, name, value FROM MARK WHERE subject_id = ? AND student_id = ?';
    db.query(getMarks, [subject_id, student_id], (err, results) => {
      if (err) {
        console.error('Error fetching marks:', err);
        res.status(500).json({ error: 'An error occurred while fetching marks.' });
      } else {
        res.json(results);
      }
    });
  } catch (err) {
    console.error('Error fetching marks:', err);
    res.status(500).json({ error: 'An error occurred while fetching marks.' });
  }
});


// Post a new mark
router.post('/', async (req, res) => {
  const { name, value, student_id, subject_id } = req.body;

  if (!name || !value || !student_id || !subject_id) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const createMarkSQL = 'INSERT INTO MARK (name, value, student_id, subject_id) VALUES (?, ?, ?, ?)';
    
    db.query(createMarkSQL, [name, value, student_id, subject_id], (err, results) => {
      if (err) {
        console.error('Error creating mark:', err);
        res.status(500).json({ error: 'An error occurred while creating the mark.' });
      } else {
        res.json({ id: results.insertId, message: 'Mark created successfully.' });
      }
    });
  } catch (err) {
    console.error('Error creating mark:', err);
    res.status(500).json({ error: 'An error occurred while creating the mark.' });
  }
});

// Update a mark based on its ID
router.patch('/:id', async (req, res) => {
  const markId = req.params.id;
  const { name, value, student_id, subject_id } = req.body;

  if (!name || !value || !student_id || !subject_id) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const updateMarkSQL = 'UPDATE MARK SET name = ?, value = ?, student_id = ?, subject_id = ? WHERE id = ?';

    db.query(updateMarkSQL, [name, value, student_id, subject_id, markId], (err, results) => {
      if (err) {
        console.error('Error updating mark:', err);
        res.status(500).json({ error: 'An error occurred while updating the mark.' });
      } else {
        res.json({ message: 'Mark updated successfully.' });
      }
    });
  } catch (err) {
    console.error('Error updating mark:', err);
    res.status(500).json({ error: 'An error occurred while updating the mark.' });
  }
});

// Delete a mark based on its ID
router.delete('/:id', (req, res) => {
  const markId = req.params.id;

  try {
    const deleteMarkSQL = 'DELETE FROM MARK WHERE id = ?';

    db.query(deleteMarkSQL, [markId], (err, results) => {
      if (err) {
        console.error('Error deleting mark:', err);
        res.status(500).json({ error: 'An error occurred while deleting the mark.' });
      } else {
        res.json({ message: 'Mark deleted successfully.' });
      }
    });
  } catch (err) {
    console.error('Error deleting mark:', err);
    res.status(500).json({ error: 'An error occurred while deleting the mark.' });
  }
});



module.exports = router;
