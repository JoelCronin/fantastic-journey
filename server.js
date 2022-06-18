const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '5Ql5Ql!!',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

db.query('source schema.sql', function (err, results) {
    console.log(results);
  });

  db.query('source seeds.sql', function (err, results) {
    console.log(results);
  });
  
// db.query('SELECT * FROM employee', function (err, results) {
//     console.log(results);
// });

app.use((req, res) => {
  res.status(404).end();
  
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = db