const mysql = require('mysql2');

const ENV = process.env.NODE_ENV || 'development';
const FILENAME = ENV === 'test' ? '_test' : '';

const databaseInfo = require(`./db_info${FILENAME}`)

if (!databaseInfo) {
    console.log("NO DETAILS GIVEN");
    throw new Error();
}

const db = mysql.createConnection(databaseInfo);

db.connect((err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Database connected.')
  })

module.exports = db;