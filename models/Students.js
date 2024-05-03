import db from "../sql.js";

let Student = {};

Student.getAll = (callback) => {
  db.query("SELECT * FROM students", callback);
};

Student.add = (studentData, callback) => {
  db.query("INSERT INTO students SET ?", studentData, callback);
};
Student.update = (id, studentData, callback) => {
  db.query("UPDATE students SET ? WHERE id = ?", [studentData, id], callback);
};
Student.delete = (id, callback) => {
  db.query("DELETE FROM students WHERE id = ?", id, callback);
};
Student.getById = (id, callback) => {
  db.query("SELECT * FROM students WHERE id = ?", id, callback);
};

Student.deleteAll = (callback) => {
  db.query("DELETE FROM students", callback);
};

export default Student;
