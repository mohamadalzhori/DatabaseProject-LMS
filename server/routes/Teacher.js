const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../db");

// JWT secret here for development
const JWT_SECRET = "wowkey";

// Middleware to check the JWT token
// const authenticateToken = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token)
//     return res
//       .status(401)
//       .json({ error: "Access denied. Token not provided." });

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ error: "Invalid token." });
//     req.user = user;
//     next();
//   });
// };

// GET all students (removed the authentication)
// router.get("/", authenticateToken, async (req, res) => {

router.get("/get/", async (req, res) => {
  const getAllTeacherSQL = "SELECT * FROM TEACHER";

  db.query(getAllTeacherSQL, (err, results) => {
    if (err) {
      console.error("Error fetching teachers:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching teachers." });
    }

    res.json(results);
  });
});

router.get("/get/:username", async (req, res) => {
  const username = req.params.username;

  const getTeacherByUsernameSQL = "SELECT * FROM TEACHER WHERE username = ?";

  db.query(getTeacherByUsernameSQL, [username], (err, results) => {
    if (err) {
      console.error("Error fetching Teacher:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching Teacher." });
    }

    if (results.length > 0) {
      res.json(results[0]); // Assuming username is unique, sending the first result
    } else {
      res.status(404).json({ error: "Teacher not found." });
    }
  });
});

// POST a new Teacher (no authentication required for registration)
router.post("/addTeacher", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  const createTeacherSQL =
    "INSERT INTO TEACHER (username, password) VALUES (?, ?)";
  const values = [username, password || null];

  db.query(createTeacherSQL, values, (err, results) => {
    if (err) {
      console.error("Error creating teacher:", err);
      res.status(500).json({
        error: "An error occurred while creating the teacher.",
        errorMessage: err.message,
      });
    } else {
      res.json({ id: results.insertId });
    }
  });
});

// PATCH route to partially update a teacher's information
router.patch("/update/:oldUsername", async (req, res) => {
  const { username, password } = req.body;
  const oldUsername = req.params.oldUsername;

  if (!oldUsername) {
    return res.status(400).json({ error: "Old username is required." });
  }

  const updateValues = {};
  if (username) updateValues.username = username;
  if (password) updateValues.password = password;

  if (Object.keys(updateValues).length === 0) {
    return res.status(400).json({ error: "No fields to update." });
  }

  const updateTeacherSQL = "UPDATE TEACHER SET ? WHERE username = ?";
  const updateQuery = [updateValues, oldUsername];

  db.query(updateTeacherSQL, updateQuery, (err, results) => {
    if (err) {
      console.error("Error updating Teacher:", err);
      res.status(500).json({
        error: "An error occurred while updating the Teacher.",
        errorMessage: err.message,
      });
    } else {
      if (results.affectedRows > 0) {
        res.json({ message: "Teacher updated successfully." });
      } else {
        res.status(404).json({ error: "Teacher not found." });
      }
    }
  });
});

// DELETE a Teacher by username
router.delete("/delete/:username", async (req, res) => {
  const username = req.params.username;

  if (!username) {
    return res.status(400).json({ error: "Username is required." });
  }

  const deleteTeacherSQL = "DELETE FROM TEACHER WHERE username = ?";
  const values = [username];

  db.query(deleteTeacherSQL, values, (err, results) => {
    if (err) {
      console.error("Error deleting Teacher:", err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the Teacher." });
    } else {
      if (results.affectedRows > 0) {
        res.json({ message: "Teacher deleted successfully." });
      } else {
        res.status(404).json({ error: "Teacher not found." });
      }
    }
  });
});

// POST login for teachers
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  const authenticateTeacherSQL =
    "SELECT * FROM TEACHER WHERE username = ? AND password = ?";
  const values = [username, password];

  db.query(authenticateTeacherSQL, values, (err, results) => {
    if (err) {
      console.error("Error authenticating teacher:", err);
      res
        .status(500)
        .json({ error: "An error occurred while authenticating the teacher." });
    } else {
      if (results.length > 0) {
        const accessToken = jwt.sign(
          { username: results[0].username },
          JWT_SECRET
        );
        res.json({
          accessToken,
          username: results[0].username,
          teacher_id: results[0].id,
          //   student_id: results[0].id,
        });
      } else {
        res.status(401).json({ error: "Invalid credentials." });
      }
    }
  });
});

module.exports = router;
