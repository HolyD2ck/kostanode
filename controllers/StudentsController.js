import express from "express";
import multer from "multer";
import path from "path";
import Student from "../models/Students.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/students");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/students", (req, res) => {
  Student.getAll((err, students) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении студентов:" });
      return;
    }
    students.forEach((student) => {
      let date = new Date(student.Дата_поступления);
      student.Дата_поступления = date.toISOString().substring(0, 10);
    });
    res.json(students);
  });
});
router.get("/students/:id", (req, res) => {
  Student.getById(req.params.id, (err, student) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении студента:" });
      return;
    }
    student.forEach((student) => {
      let date = new Date(student.Дата_поступления);
      student.Дата_поступления = date.toISOString().substring(0, 10);
    });
    res.json(student);
  });
});
router.post("/students", upload.single("photo"), (req, res) => {
  let studentData = {
    Имя: req.body.name,
    Фамилия: req.body.surname,
    Возраст: req.body.age,
    Класс: req.body.class,
    Инструмент: req.body.tool,
    Email: req.body.email,
    Телефон_родителей: req.body.phone,
    Стипендия: req.body.pay,
    Дата_поступления: req.body.enter_date,
    Фото: req.file.path.replace(/\\/g, "/"),
  };

  Student.add(studentData, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при добавлении студента:" });
      return;
    }
    res.json({ message: "Студента успешно добавлен" });
  });
});

router.delete("/students/:id", (req, res) => {
  Student.getById(req.params.id, (err, student) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении студента:" });
      return;
    }

    Student.delete(req.params.id, (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Произошла ошибка при удалении студента:" });
        return;
      }
      res.json({ message: "Студент успешно удален" });
    });
  });
});
router.delete("/delete-all-students", (req, res) => {
  Student.deleteAll((err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при удалении студентов:" });
      return;
    }
    res.json({ message: "Все студенты успешно удалены" });
  });
});
router.put("/students/:id", upload.single("photo"), (req, res) => {
  let studentData = {
    Имя: req.body.name,
    Фамилия: req.body.surname,
    Возраст: req.body.age,
    Класс: req.body.class,
    Инструмент: req.body.tool,
    Email: req.body.email,
    Телефон_родителей: req.body.phone,
    Стипендия: req.body.pay,
    Дата_поступления: req.body.enter_date,
  };

  if (req.file) {
    studentData.Фото = req.file.path.replace(/\\/g, "/");
  }

  Student.update(req.params.id, studentData, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при обновлении студента:" });
      return;
    }
    res.json({ message: "Студент успешно обновлен" });
  });
});

export default router;
