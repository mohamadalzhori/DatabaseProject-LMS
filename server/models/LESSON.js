const createTableSQL = `
CREATE TABLE IF NOT EXISTS LESSON (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  subject_id INT,
  grade_id INT,
  FOREIGN KEY (subject_id) REFERENCES SUBJECT(id),
  FOREIGN KEY (grade_id) REFERENCES GRADE(id)
);
`;

module.exports = {
  initializeTable: (db) => {
    db.query(createTableSQL, (err, results) => {
      if (err) {
        console.error("Error creating LESSON table:", err);
      } else {
        console.log("LESSON table ready");
      }
    });
  },
};
