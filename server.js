import express from "express";
import studentsRouter from "./controllers/StudentsController.js";
import teachersRouter from "./controllers/TeachersController.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import { exec } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", studentsRouter);
app.use("/", teachersRouter);

app.get("/run-student-faker", (req, res) => {
  exec("node StudentFaker.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
  res.send("StudentFaker.js запущен");
});

app.get("/run-teacher-faker", (req, res) => {
  exec("node TeacherFaker.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
  res.send("TeacherFaker.js запущен");
});

const server = app.listen(3000, () => {
  console.log("Server started on port 3000");
});
