const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../db");

// get lessons based on grade and subject
router.get("/:subject_id/:grade_id", async (req, res) => {
  const subject_id = req.params.subject_id;
  const grade_id = req.params.grade_id;
  try {
    const getLessons =
      "SELECT id, name FROM LESSON WHERE subject_id = ? AND grade_id = ?";
    db.query(getLessons, [subject_id, grade_id], (err, results) => {
      if (err) {
        console.error("Error fetching lessons:", err);
        res
          .status(500)
          .json({ error: "An error occurred while fetching lessons." });
      } else {
        res.json(results);
      }
    });
  } catch (err) {
    console.error("Error fetching lessons:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching lessons." });
  }
});

// Get homeworks of a grade with restrictions of subject_id in the query in front end
router.get("/:grade_id", async (req, res) => {
  const grade_id = req.params.grade_id;
  const subjectIdsArray = req.query.subjectIds.split(","); // Split string into an array

  const placeholders = subjectIdsArray.map(() => "?").join(",");

  const getHomeworks = `
    SELECT *
    FROM LESSON 
    WHERE grade_id = ? AND subject_id IN (${placeholders})
  `;

  const values = [grade_id, ...subjectIdsArray]; // Combining grade_id with subjectIdsArray

  db.query(getHomeworks, values, (err, results) => {
    if (err) {
      console.error("Error fetching homeworks:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching homeworks." });
    } else {
      res.json(results);
    }
  });
});

// Update a lesson based on its ID
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  // Assuming you have the updated lesson data in the request body
  const updatedLessonData = req.body;

  try {
    const updateLessonSQL = "UPDATE LESSON SET name = ? WHERE id = ?";

    db.query(updateLessonSQL, [updatedLessonData.name, id], (err, results) => {
      if (err) {
        console.error("Error updating lesson:", err);
        res
          .status(500)
          .json({ error: "An error occurred while updating the lesson." });
      } else {
        res.json({ message: "Lesson updated successfully." });
      }
    });
  } catch (err) {
    console.error("Error updating lesson:", err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the lesson." });
  }
});

// Delete a lesson and its associated documents based on ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  // First, delete documents associated with the lesson
  const deleteDocs = "DELETE FROM DOCUMENT WHERE lesson_id = ?";

  db.query(deleteDocs, [id], (err, results) => {
    if (err) {
      console.error("Error deleting documents:", err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the documents." });
    } else {
      // After deleting documents, delete the lesson
      const deleteLessonSQL = "DELETE FROM LESSON WHERE id = ?";

      db.query(deleteLessonSQL, [id], (err, results) => {
        if (err) {
          console.error("Error deleting lesson:", err);
          res
            .status(500)
            .json({ error: "An error occurred while deleting the lesson." });
        } else {
          res.json({
            message: "Lesson and associated documents deleted successfully.",
          });
        }
      });
    }
  });
});

// post lessons
router.post("/", async (req, res) => {
  const { name, subject_id, grade_id } = req.body;

  if (!name || !subject_id || !grade_id) {
    return res.status(400).json({ error: "Missing fields." });
  }

  const addLesson =
    "INSERT INTO lesson (name, subject_id, grade_id) VALUES (?, ?, ?)";
  const values = [name, subject_id, grade_id || null];

  db.query(addLesson, values, (err, results) => {
    if (err) {
      console.error("Error creating lesson:", err);
      res
        .status(500)
        .json({ error: "An error occurred while creating the lesson." });
    } else {
      res.json({ id: results.insertId });
    }
  });
});

module.exports = router;
