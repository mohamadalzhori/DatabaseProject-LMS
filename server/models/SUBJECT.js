const createTableSQL = `
CREATE TABLE IF NOT EXISTS SUBJECT (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255)
);
`;

// const insertSubjectSQL = `
// INSERT INTO SUBJECT (name) VALUES ('ARABIC'), ('ENGLISH'), ('MATHEMATICS'), ('SCIENCES'), ('ISLAMIC CULTURE');
// `;

module.exports = {
  initializeTable: (db) => {
    db.query(createTableSQL, (err, results) => {
      if (err) {
        console.error("Error creating SUBJECT table:", err);
      } else {
        console.log("SUBJECT table ready");

        // After creating the table, insert subjects
        // db.query(insertSubjectSQL, (err, results) => {
        //   if (err) {
        //     console.error('Error inserting subjects:', err);
        //   } else {
        //     console.log('subjects inserted successfully');
        //   }
        // });
      }
    });
  },
};
