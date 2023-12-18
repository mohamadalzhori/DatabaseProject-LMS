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

module.exports = router;
