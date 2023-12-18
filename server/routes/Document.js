const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../db");

// get documents based on the lesson_id
router.get("/:lesson_id", async (req, res) => {
  const lesson_id = req.params.lesson_id;

  try {
    const getDocs =
      "SELECT id, title, description, url FROM DOCUMENT WHERE lesson_id = ?";
    db.query(getDocs, [lesson_id], (err, results) => {
      if (err) {
        console.error("Error fetching documents:", err);
        res
          .status(500)
          .json({ error: "An error occurred while fetching documents." });
      } else {
        res.json(results);
      }
    });
  } catch (err) {
    console.error("Error fetching documents:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching documents." });
  }
});

// post document
router.post("/", async (req, res) => {
  const { title, description, URL, lesson_id } = req.body;

  if (!title || !description || !URL || !lesson_id) {
    return res.status(400).json({ error: "Missing fields." });
  }

  const addDoc =
    "INSERT INTO document (title, description, URL, lesson_id) VALUES (?, ?, ?, ?)";
  const values = [title, description, URL, lesson_id || null];

  db.query(addDoc, values, (err, results) => {
    if (err) {
      console.error("Error creating document:", err);
      res
        .status(500)
        .json({ error: "An error occurred while creating the document." });
    } else {
      res.json({ id: results.insertId });
    }
  });
});

// Update a document based on its ID
router.patch("/:id", async (req, res) => {
  const documentId = req.params.id;

  // Assuming you have the updated document data in the request body
  const updatedDocumentData = req.body;

  try {
    const updateDocumentSQL =
      "UPDATE DOCUMENT SET title = ?, description = ?, URL = ? WHERE id = ?";

    db.query(
      updateDocumentSQL,
      [
        updatedDocumentData.title,
        updatedDocumentData.description,
        updatedDocumentData.URL,
        documentId,
      ],
      (err, results) => {
        if (err) {
          console.error("Error updating document:", err);
          res
            .status(500)
            .json({ error: "An error occurred while updating the document." });
        } else {
          res.json({ message: "Document updated successfully." });
        }
      }
    );
  } catch (err) {
    console.error("Error updating document:", err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the document." });
  }
});

// Delete a document based on its ID
router.delete("/:id", (req, res) => {
  const documentId = req.params.id;

  try {
    const deleteDocumentSQL = "DELETE FROM DOCUMENT WHERE id = ?";

    db.query(deleteDocumentSQL, [documentId], (err, results) => {
      if (err) {
        console.error("Error deleting document:", err);
        res
          .status(500)
          .json({ error: "An error occurred while deleting the document." });
      } else {
        res.json({ message: "Document deleted successfully." });
      }
    });
  } catch (err) {
    console.error("Error deleting document:", err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the document." });
  }
});

module.exports = router;
