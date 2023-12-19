const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../db");

// get homeworks based on grade and subject
router.get("/:subject_id/:grade_id", async (req, res) => {
  const subject_id = req.params.subject_id;
  const grade_id = req.params.grade_id;
  try {
    const getHomeworks =
      "SELECT id, title, description, due_date FROM HOMEWORK WHERE subject_id = ? AND grade_id = ?";
    db.query(getHomeworks, [subject_id, grade_id], (err, results) => {
      if (err) {
        console.error("Error fetching homeworks:", err);
        res
          .status(500)
          .json({ error: "An error occurred while fetching homeworks." });
      } else {
        res.json(results);
      }
    });
  } catch (err) {
    console.error("Error fetching homeworks:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching homeworks." });
  }
});

// Get homeworks of a grade with restrictions of subject_id in the query in front end
router.get("/:grade_id", async (req, res) => {
  const grade_id = req.params.grade_id;
  const subjectIdsArray = req.query.subjectIds.split(","); // Split string into an array

  const placeholders = subjectIdsArray.map(() => "?").join(",");

  const getHomeworks = `
    SELECT *
    FROM HOMEWORK 
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

// Post a new homework
router.post("/add/", async (req, res) => {
  const { title, description, due_date, subject_id, grade_id } = req.body;

  if (!title || !description || !due_date || !subject_id || !grade_id) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const createHomeworkSQL =
      "INSERT INTO HOMEWORK (title, description, due_date, subject_id, grade_id) VALUES (?, ?, ?, ?, ?)";

    db.query(
      createHomeworkSQL,
      [title, description, due_date, subject_id, grade_id],
      (err, results) => {
        if (err) {
          console.error("Error creating homework:", err);
          res
            .status(500)
            .json({ error: "An error occurred while creating the homework." });
        } else {
          res.json({
            id: results.insertId,
            message: "Homework created successfully.",
          });
        }
      }
    );
  } catch (err) {
    console.error("Error creating homework:", err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the homework." });
  }
});

// Update a homework based on its ID
router.patch("/:id", async (req, res) => {
  const homeworkId = req.params.id;
  const { title, description, due_date, subject_id, grade_id } = req.body;

  if (!title || !description || !due_date || !subject_id || !grade_id) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const updateHomeworkSQL =
      "UPDATE HOMEWORK SET title = ?, description = ?, due_date = ?, subject_id = ?, grade_id = ? WHERE id = ?";

    db.query(
      updateHomeworkSQL,
      [title, description, due_date, subject_id, grade_id, homeworkId],
      (err, results) => {
        if (err) {
          console.error("Error updating homework:", err);
          res
            .status(500)
            .json({ error: "An error occurred while updating the homework." });
        } else {
          res.json({ message: "Homework updated successfully." });
        }
      }
    );
  } catch (err) {
    console.error("Error updating homework:", err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the homework." });
  }
});

// Delete a homework based on its ID
router.delete("/:id", (req, res) => {
  const homeworkId = req.params.id;

  try {
    const deleteHomeworkSQL = "DELETE FROM HOMEWORK WHERE id = ?";

    db.query(deleteHomeworkSQL, [homeworkId], (err, results) => {
      if (err) {
        console.error("Error deleting homework:", err);
        res
          .status(500)
          .json({ error: "An error occurred while deleting the homework." });
      } else {
        res.json({ message: "Homework deleted successfully." });
      }
    });
  } catch (err) {
    console.error("Error deleting homework:", err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the homework." });
  }
});

module.exports = router;
