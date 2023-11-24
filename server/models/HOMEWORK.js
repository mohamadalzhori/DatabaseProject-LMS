const createTableSQL = `
CREATE TABLE IF NOT EXISTS HOMEWORK (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description VARCHAR(255),
  due_date DATE,
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
        console.error('Error creating HOMEWORK table:', err);
      } else {
        console.log('HOMEWORK table created successfully');
      }
    });
  },
};
