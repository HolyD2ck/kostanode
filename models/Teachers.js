import db from "../sql.js";

let Teacher = {};

Teacher.getAll = (callback) => {
  db.query("SELECT * FROM teachers", callback);
};

Teacher.add = (teacherData, callback) => {
  db.query("INSERT INTO teachers SET ?", teacherData, callback);
};

Teacher.update = (id, teacherData, callback) => {
  db.query("UPDATE teachers SET ? WHERE id = ?", [teacherData, id], callback);
};

Teacher.delete = (id, callback) => {
  db.query("DELETE FROM teachers WHERE id = ?", id, callback);
};

Teacher.getById = (id, callback) => {
  db.query("SELECT * FROM teachers WHERE id = ?", id, callback);
};

Teacher.deleteAll = (callback) => {
  db.query("DELETE FROM teachers", callback);
};

export default Teacher;
