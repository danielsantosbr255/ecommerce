const express = require("express");
const { DatabaseSync } = require("node:sqlite");

const { CREATE_USER, INSERT_USER } = require("./LOCAL/mutations");
const { GET_USERS } = require("./QUERY/query");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.port || 3001;
const db = new DatabaseSync("sqlite.db");

const createTable = () => {
  console.log("🔃Creating Tables on Database...");
  db.exec(CREATE_USER);
};

try {
  createTable();
  console.log("✅Tables created successfully!");
} catch (error) {
  console.log("Error creating tables", error);
}

// routes
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  const isert = db.prepare(INSERT_USER);
  const user = isert.run(name, email);

  console.log("users:", user);
  return res.status(201).json({ message: "User created sucessfully" });
});

app.get("/users", (req, res) => {
  try {
    const users = db.prepare(GET_USERS).all();
    return res.status(200).json({ users });
  } catch (error) {
    console.log("Error getting users", error);
    return res.status(500).json({ message: "Error getting users" });
  }
});

app.listen(port, () => {
  console.log("🚀 Server is running...");
});
