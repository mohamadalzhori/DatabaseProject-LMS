const createTableSQL = `
CREATE TABLE IF NOT EXISTS SUCCESS_STORY (
    id INT AUTO_INCREMENT PRIMARY KEY,
    month VARCHAR(15),
    name VARCHAR(255),
    description VARCHAR(255),
    student_id INT,
    grade INT,
    subject_id INT,
    FOREIGN KEY (student_id) REFERENCES STUDENT(id) ON DELETE CASCADE
  );
  
`;

module.exports = {
  initializeTable: (db) => {
    db.query(createTableSQL, (err, results) => {
      if (err) {
        console.error("Error creating SUCCESS_STORY table:", err);
      } else {
        console.log("SUCCESS_STORY table ready");
      }
    });
  },
};
