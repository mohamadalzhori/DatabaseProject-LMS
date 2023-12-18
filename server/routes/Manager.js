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

// PATCH route to partially update the manager's information
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

  const updateManagerSQL = "UPDATE MANAGER SET ? WHERE username = ?";
  const updateQuery = [updateValues, oldUsername];

  db.query(updateManagerSQL, updateQuery, (err, results) => {
    if (err) {
      console.error("Error updating Manager:", err);
      res.status(500).json({
        error: "An error occurred while updating the Manager.",
        errorMessage: err.message,
      });
    } else {
      if (results.affectedRows > 0) {
        res.json({ message: "Manager updated successfully." });
      } else {
        res.status(404).json({ error: "Manager not found." });
      }
    }
  });
});

// POST login for Manager
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  const authenticateManagerSQL =
    "SELECT * FROM MANAGER WHERE username = ? AND password = ?";
  const values = [username, password];

  db.query(authenticateManagerSQL, values, (err, results) => {
    if (err) {
      console.error("Error authenticating Manager:", err);
      res
        .status(500)
        .json({ error: "An error occurred while authenticating the Manager." });
    } else {
      if (results.length > 0) {
        const accessToken = jwt.sign(
          { username: results[0].username },
          JWT_SECRET
        );
        res.json({
          accessToken,
          username: results[0].username,
        });
      } else {
        res.status(401).json({ error: "Invalid credentials." });
      }
    }
  });
});

module.exports = router;
