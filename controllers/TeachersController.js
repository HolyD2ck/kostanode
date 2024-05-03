import express from "express";
import multer from "multer";
import path from "path";
import Teacher from "../models/Teachers.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/teachers");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/teachers", (req, res) => {
  Teacher.getAll((err, teachers) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении учителей:" });
      return;
    }
    teachers.forEach((teacher) => {
      let date = new Date(teacher.Дата_принятия_на_работу);
      teacher.Дата_принятия_на_работу = date.toISOString().substring(0, 10);
    });
    res.json(teachers);
  });
});
router.get("/teachers/:id", (req, res) => {
  Teacher.getById(req.params.id, (err, teacher) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении учителя:" });
      return;
    }
    teacher.forEach((teacher) => {
      let date = new Date(teacher.Дата_принятия_на_работу);
      teacher.Дата_принятия_на_работу = date.toISOString().substring(0, 10);
    });
    res.json(teacher);
  });
});
router.post("/teachers", upload.single("photo"), (req, res) => {
  let teacherData = {
    Имя: req.body.name,
    Фамилия: req.body.surname,
    Возраст: req.body.age,
    Специализация: req.body.spec,
    Стаж: req.body.year,
    Email: req.body.email,
    Телефон: req.body.phone,
    Зарплата: req.body.pay,
    Дата_принятия_на_работу: req.body.enter_date,
    Фото: req.file.path.replace(/\\/g, "/"),
  };

  Teacher.add(teacherData, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при добавлении учителя:" });
      return;
    }
    res.json({ message: "Учитель успешно добавлен" });
  });
});

router.delete("/teachers/:id", (req, res) => {
  Teacher.getById(req.params.id, (err, teacher) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении учителя:" });
      return;
    }

    Teacher.delete(req.params.id, (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Произошла ошибка при удалении учителя:" });
        return;
      }
      res.json({ message: "Учитель успешно удален" });
    });
  });
});
router.delete("/delete-all-teachers", (req, res) => {
  Teacher.deleteAll((err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Произошла ошибка при удалении учителя:" });
      return;
    }
    res.json({ message: "Все учите успешно удалены" });
  });
});
router.put("/teachers/:id", upload.single("photo"), (req, res) => {
  let teacherData = {
    Имя: req.body.name,
    Фамилия: req.body.surname,
    Возраст: req.body.age,
    Специализация: req.body.spec,
    Стаж: req.body.year,
    Email: req.body.email,
    Телефон: req.body.phone,
    Зарплата: req.body.pay,
    Дата_принятия_на_работу: req.body.enter_date,
  };

  if (req.file) {
    teacherData.Фото = req.file.path.replace(/\\/g, "/");
  }

  Teacher.update(req.params.id, teacherData, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при обновлении учителя:" });
      return;
    }
    res.json({ message: "Учитель успешно обновлен" });
  });
});

export default router;
