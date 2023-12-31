const createTableSQL = `
CREATE TABLE IF NOT EXISTS MANAGER (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);
`;

module.exports = {
  initializeTable: (db) => {
    db.query(createTableSQL, (err, results) => {
      if (err) {
        console.error("Error creating MANAGER table:", err);
      } else {
        console.log("MANAGER table ready");
      }
    });
  },
};
