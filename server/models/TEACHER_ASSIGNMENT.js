const createTableSQL = `
CREATE TABLE IF NOT EXISTS TEACHER_ASSIGNMENT (
    teacher_id INT,
    grade_id INT,
    subject_id INT,
    PRIMARY KEY (teacher_id, grade_id, subject_id),

    FOREIGN KEY (teacher_id) REFERENCES TEACHER(id),
    FOREIGN KEY (grade_id) REFERENCES GRADE(id),
    FOREIGN KEY (subject_id) REFERENCES SUBJECT(id)
);
`;


module.exports = {
  initializeTable: (db) => {
    db.query(createTableSQL, (err, results) => {
      if (err) {
        console.error('Error creating TEACHER_ASSIGNMENT table:', err);
      } else {
        console.log('TEACHER_ASSIGNMENT table created successfully');
      }
    });
  },
};
