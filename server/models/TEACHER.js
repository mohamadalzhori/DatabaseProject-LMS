const createTableSQL = `
CREATE TABLE IF NOT EXISTS TEACHER (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  firstname VARCHAR(25),
  lastname VARCHAR(25),
  phoneNb VARCHAR(15)
);
`;

module.exports = {
  initializeTable: (db) => {
    db.query(createTableSQL, (err, results) => {
      if (err) {
        console.error("Error creating TEACHER table:", err);
      } else {
        console.log("TEACHER table ready");
      }
    });
  },
};
