const createTableSQL = `
CREATE TABLE IF NOT EXISTS STUDENT (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255),
  grade_id INT,
  FOREIGN KEY (grade_id) REFERENCES GRADE(id)
);
`;

module.exports = {
  initializeTable: (db) => {
    db.query(createTableSQL, (err, results) => {
      if (err) {
        console.error("Error creating STUDENT table:", err);
      } else {
        console.log("STUDENT table ready");
      }
    });
  },
};
