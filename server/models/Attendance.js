const createTableSQL = `
CREATE TABLE IF NOT EXISTS ATTENDANCE (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    status BOOLEAN,
    student_id INT,
    FOREIGN KEY (student_id) REFERENCES STUDENT(id)
  );
  
`;

module.exports = {
  initializeTable: (db) => {
    db.query(createTableSQL, (err, results) => {
      if (err) {
        console.error("Error creating ATTENDANCE table:", err);
      } else {
        console.log("ATTENDANCE table ready");
      }
    });
  },
};
