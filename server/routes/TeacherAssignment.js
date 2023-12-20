const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:teacher_id", async (req, res) => {
  const teacher_id = req.params.teacher_id;

  const getTeacherByTeacherIdSQL =
    "SELECT grade_id, subject_id FROM TEACHER_ASSIGNMENT WHERE teacher_id = ?";

  db.query(getTeacherByTeacherIdSQL, [teacher_id], (err, results) => {
    if (err) {
      console.error("Error fetching Teacher:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching Teacher." });
    }

    res.json(results);
  });
});

router.get("/", async (req, res) => {
  const getTeacherAssignmentSQL =
    "SELECT username, grade_id, subject_id, teacher_id FROM TEACHER T, TEACHER_ASSIGNMENT TA WHERE T.id = TA.teacher_id ORDER BY T.username, TA.grade_id, TA.subject_id";

  db.query(getTeacherAssignmentSQL, (err, results) => {
    if (err) {
      console.error("Error fetching Teacher:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching Teacher." });
    }

    res.json(results);
  });
});

// DELETE teacher assignment by teacher_id, grade_id, subject_id
router.delete("/delete/:teacher_id/:grade_id/:subject_id", async (req, res) => {
  const teacher_id = req.params.teacher_id;
  const grade_id = req.params.grade_id;
  const subject_id = req.params.subject_id;

  const deleteTeacherAssignmentSQL =
    "DELETE FROM TEACHER_ASSIGNMENT WHERE teacher_id = ? AND grade_id = ? AND subject_id = ?";

  db.query(
    deleteTeacherAssignmentSQL,
    [teacher_id, grade_id, subject_id],
    (err, results) => {
      if (err) {
        console.error("Error deleting Teacher Assignment:", err);
        return res.status(500).json({
          error: "An error occurred while deleting Teacher Assignment.",
        });
      }

      res.json(results);
    }
  );
});

// POST new teacher assignment
router.post("/add", async (req, res) => {
  const { teacher_id, grade_id, subject_id } = req.body;

  const addTeacherAssignmentSQL =
    "INSERT INTO TEACHER_ASSIGNMENT (teacher_id, grade_id, subject_id) VALUES (?, ?, ?)";

  db.query(
    addTeacherAssignmentSQL,
    [teacher_id, grade_id, subject_id],
    (err, results) => {
      if (err) {
        console.error("Error adding Teacher Assignment:", err);
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json(results);
    }
  );
});

module.exports = router;
