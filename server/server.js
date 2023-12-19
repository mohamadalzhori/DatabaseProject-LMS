const express = require("express");
const { body, validationResult } = require("express-validator");
const cors = require("cors");
const db = require("./db"); // Import the database connection from db.js

const app = express();

// allowing requests from our forntend only
var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import the models
const models = [
  require("./models/MANAGER"),
  require("./models/GRADE"),
  require("./models/STUDENT"),
  require("./models/TEACHER"),
  require("./models/SUBJECT"),
  require("./models/SUCCESS_STORY"),
  require("./models/LESSON"),
  require("./models/HOMEWORK"),
  require("./models/DOCUMENT"),
  require("./models/TEACHER_ASSIGNMENT"),
  require("./models/ATTENDANCE"),
  require("./models/MARK"),
];
models.forEach((model) => model.initializeTable(db));

// Routers
app.use("/student", require("./routes/Student"));
app.use("/teacher", require("./routes/Teacher"));
app.use("/successStory", require("./routes/SuccessStory"));
app.use("/teacherAssignment", require("./routes/TeacherAssignment"));
app.use("/manager", require("./routes/Manager"));
app.use("/lesson", require("./routes/Lesson"));
app.use("/homework", require("./routes/Homework"));
app.use("/mark", require("./routes/Mark"));
app.use("/document", require("./routes/Document"));

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Student Management System");
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
