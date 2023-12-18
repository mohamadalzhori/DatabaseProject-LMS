const createTableSQL = `
CREATE TABLE IF NOT EXISTS MARK (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    value INT,
    student_id INT,
    subject_id INT,
    FOREIGN KEY (subject_id) REFERENCES SUBJECT(id),
    FOREIGN KEY (student_id) REFERENCES STUDENT(id)
);
`;

module.exports = {
  initializeTable: (db) => {
    db.query(createTableSQL, (err, results) => {
      if (err) {
        console.error("Error creating MARK table:", err);
      } else {
        console.log("MARK table ready");
      }
    });
  },
};
