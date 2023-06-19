const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
// const postRouter = require("./routes/Posts");
// app.use('/posts', postRouter);

// const UsersRouter = require("./routes/Users");
// app.use('/auth', UsersRouter);

const studentsRouter = require("./routes/Students");
app.use('/authStudents', studentsRouter);

const teachersRouter = require("./routes/Teachers");
app.use('/authTeachers', teachersRouter);

const managersRouter = require("./routes/Managers");
app.use('/authManagers', managersRouter);

// -------------------

const gradesRouter = require("./routes/Grades");
app.use('/grades', gradesRouter);

const subjectsRouter = require("./routes/Subjects");
app.use('/subjects', subjectsRouter);

const lessonsRouter = require("./routes/Lessons");
app.use('/lessons', lessonsRouter);

const documentsRouter = require("./routes/Documents");
app.use('/documents', documentsRouter);


db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});