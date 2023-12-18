const createTableSQL = `
CREATE TABLE IF NOT EXISTS DOCUMENT (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description VARCHAR(255),
  url VARCHAR(255),
  lesson_id INT,
  FOREIGN KEY (lesson_id) REFERENCES LESSON(id)
);
`;

module.exports = {
  initializeTable: (db) => {
    db.query(createTableSQL, (err, results) => {
      if (err) {
        console.error("Error creating DOCUMENT table:", err);
      } else {
        console.log("DOCUMENT table ready");
      }
    });
  },
};
