const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/add", (req, res) => {
  const { month, name, description, student_id } = req.body;

  // Check if all required fields are present in the request body
  if (!month || !name || !description || !student_id) {
    return res.status(400).json({ error: "Missing fields." });
  }

  const insertSuccessStory = `
    INSERT INTO SUCCESS_STORY (month, name, description, student_id) 
    VALUES (?, ?, ?, ?)
  `;
  const values = [month, name, description, student_id];

  db.query(insertSuccessStory, values, (err, results) => {
    if (err) {
      console.error("Error creating success story:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while creating the success story." });
    } else {
      return res.status(201).json({
        message: "Success story created successfully.",
        id: results.insertId,
      });
    }
  });
});

module.exports = router;
