const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'Vikram@1996#',
  database: 'user'
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    console.log(err.message,"errormessage")
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = connection;