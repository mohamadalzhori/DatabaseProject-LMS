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
  const getAllStudentSQL = "SELECT * FROM student";

  db.query(getAllStudentSQL, (err, results) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching students." });
    }

    res.json(results);
  });
});

// Get a specific student by ID
router.get("/get/:username", async (req, res) => {
  const username = req.params.username;

  const getStudentByUsernameSQL = "SELECT * FROM STUDENT WHERE username = ?";

  db.query(getStudentByUsernameSQL, [username], (err, results) => {
    if (err) {
      console.error("Error fetching student:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching student." });
    }

    if (results.length > 0) {
      res.json(results[0]); // Assuming username is unique, sending the first result
    } else {
      res.status(404).json({ error: "Student not found." });
    }
  });
});

// Get all students in a specific grade
router.get("/get/grade/:gradeId", async (req, res) => {
  const gradeId = req.params.gradeId;

  const getStudentsByGradeSQL = "SELECT * FROM student WHERE grade_id = ?";

  db.query(getStudentsByGradeSQL, [gradeId], (err, results) => {
    if (err) {
      console.error("Error fetching students by grade:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching students." });
    }

    res.json(results);
  });
});

// POST a new student (no authentication required for registration)
router.post("/addStudent", async (req, res) => {
  const { username, password, grade_id, firstname, lastname, phoneNb } =
    req.body;

  if (
    !username ||
    !password ||
    !grade_id ||
    !firstname ||
    !lastname ||
    !phoneNb
  ) {
    return res.status(400).json({ error: "All Fields are required." });
  }

  const createStudentSQL =
    "INSERT INTO STUDENT (username, password, grade_id, firstname,lastname,phoneNb) VALUES (?, ?, ?,?,?,?)";
  const values = [
    username,
    password,
    grade_id,
    firstname,
    lastname,
    phoneNb || null,
  ];

  db.query(createStudentSQL, values, (err, results) => {
    if (err) {
      console.error("Error creating student:", err);
      res.status(500).json({
        error: "An error occurred while creating the student.",
        errorMessage: err.message,
      });
    } else {
      res.json({ id: results.insertId });
    }
  });
});

// PATCH route to partially update a student's information
router.patch("/update/:oldUsername", async (req, res) => {
  const { username, password, grade_id } = req.body;
  const oldUsername = req.params.oldUsername;

  if (!oldUsername) {
    return res.status(400).json({ error: "Old username is required." });
  }

  const updateValues = {};
  if (username) updateValues.username = username;
  if (password) updateValues.password = password;
  if (grade_id) updateValues.grade_id = grade_id;

  if (Object.keys(updateValues).length === 0) {
    return res.status(400).json({ error: "No fields to update." });
  }

  const updateStudentSQL = "UPDATE STUDENT SET ? WHERE username = ?";
  const updateQuery = [updateValues, oldUsername];

  db.query(updateStudentSQL, updateQuery, (err, results) => {
    if (err) {
      console.error("Error updating student:", err);
      res.status(500).json({
        error: "An error occurred while updating the student.",
        errorMessage: err.message,
      });
    } else {
      if (results.affectedRows > 0) {
        res.json({ message: "Student updated successfully." });
      } else {
        res.status(404).json({ error: "Student not found." });
      }
    }
  });
});

// DELETE a student by username
router.delete("/delete/:username", async (req, res) => {
  const username = req.params.username;

  if (!username) {
    return res.status(400).json({ error: "Username is required." });
  }

  const deleteStudentSQL = "DELETE FROM STUDENT WHERE username = ?";
  const values = [username];

  db.query(deleteStudentSQL, values, (err, results) => {
    if (err) {
      console.error("Error deleting student:", err);
      res.status(500).json({ err });
    } else {
      if (results.affectedRows > 0) {
        res.json({ message: "Student deleted successfully." });
      } else {
        res.status(404).json({ error: "Student not found." });
      }
    }
  });
});

// POST login for students
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  const authenticateStudentSQL =
    "SELECT * FROM student WHERE username = ? AND password = ?";
  const values = [username, password];

  db.query(authenticateStudentSQL, values, (err, results) => {
    if (err) {
      console.error("Error authenticating student:", err);
      res
        .status(500)
        .json({ error: "An error occurred while authenticating the student." });
    } else {
      if (results.length > 0) {
        const accessToken = jwt.sign(
          { username: results[0].username },
          JWT_SECRET
        );
        res.json({
          accessToken,
          username: results[0].username,
          grade_id: results[0].grade_id,
          student_id: results[0].id,
        });
      } else {
        res.status(401).json({ error: "Invalid credentials." });
      }
    }
  });
});

module.exports = router;
