const createTableSQL = `
CREATE TABLE IF NOT EXISTS GRADE (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255)
);
`;

// const insertGradesSQL = `
// INSERT INTO GRADE (name) VALUES ('GRADE 1'), ('GRADE 2'), ('GRADE 3'), ('GRADE 4'), ('GRADE 5'), ('GRADE 6');
// `;

module.exports = {
  initializeTable: (db) => {
    db.query(createTableSQL, (err, results) => {
      if (err) {
        console.error("Error creating GRADE table:", err);
      } else {
        console.log("GRADE table ready");

        // After creating the table, insert grades
        // db.query(insertGradesSQL, (err, results) => {
        //   if (err) {
        //     console.error('Error inserting grades:', err);
        //   } else {
        //     console.log('Grades inserted successfully');
        //   }
        // });
      }
    });
  },
};
