const CREATE_USER = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);
`;

const INSERT_USER = `
INSERT INTO users (name, email) VALUES (?, ?)
`;

module.exports = { CREATE_USER, INSERT_USER };
