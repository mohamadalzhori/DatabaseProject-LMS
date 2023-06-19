const express = require("express");
const router = express.Router();
const { Documents, Lessons } = require("../models");

// Fetch Documents by subject ID, grade ID, and lesson ID
router.get('/:gradeId/:subjectId/:lessonId', async (req, res) => {
  const { gradeId, subjectId, lessonId } = req.params;

  try {
    const documents = await Documents.findAll({
      where: {  
        grade_id: gradeId,
        subject_id: subjectId,
        lesson_id: lessonId
      },
    });

    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch all Documents by grade
router.get('/:gradeId', async (req, res) => {
  const { gradeId} = req.params;

  try {
    const documents = await Documents.findAll({
      where: {  
        grade_id: gradeId,
      },
    });
    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Fetch all Documents
router.get('/', async (req, res) => {
  try {
    const documents = await Documents.findAll();
    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Create a new Document
router.post('/', async (req, res) => {
  try {
    const { document_name, document_link, grade_id, subject_id, lesson_name } = req.body;

    // Check if the lesson already exists with the same subject and grade
    const existingLesson = await Lessons.findOne({
      where: {
        grade_id,
        subject_id,
        lesson_name
      }
    });

    let createdLesson;

    if (existingLesson) {
      // If the lesson already exists, use the existing lesson
      createdLesson = existingLesson;
    } else {
      // If the lesson doesn't exist, create a new lesson
      createdLesson = await Lessons.create({
        grade_id,
        subject_id,
        lesson_name,
      });

    }

    // Create the document
    const document = await Documents.create({
      grade_id,
      subject_id,
      lesson_id: createdLesson.id,
      document_name,
      document_link
    });

    res.json(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





module.exports = router;
