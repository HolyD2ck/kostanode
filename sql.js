import mysql from "mysql2";

let pool = mysql.createPool({
  connectionLimit: 10,
  host: "yyeegg7r.beget.tech",
  user: "yyeegg7r_kk",
  password: "Q1qqqqqq",
  database: "yyeegg7r_kk",
});

export default pool;
