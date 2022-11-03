const mysql = require('mysql2');
const databaseInfo = require('./db_info')

const ENV = process.env.NODE_ENV || 'development';
console.log(ENV, 'sql_f1_ops')

if (!databaseInfo) {
    console.log("NO DETAILS GIVEN");
    throw new Error();
}

const db = mysql.createConnection(databaseInfo);

// db.connect(function(err) {
//   if (err) console.log(err);
//   console.log("Connected!");
//   db.query('SELECT * FROM points;', function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

// db.query('SELECT * FROM points;', function (err, result, fields) {
//   if (err) throw err;
//   console.log(result);
// });

db.connect((err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Database connected')
  })

module.exports = db;