const mysql = require('mysql2');

const ENV = process.env.NODE_ENV || 'development';
const FILENAME = ENV === 'test' ? '_test' : '';

const databaseInfo = ENV === 'production' ? {
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'ba33c92061e72d',
  password: '44ed5e4e',
  database: 'heroku_92a3d28c7bb8175'
} : require(`./db_info${FILENAME}`);

console.log(ENV)

if (!databaseInfo) {
    console.log("NO DETAILS GIVEN");
    throw new Error();
}

const db = mysql.createConnection(databaseInfo);

const pool = mysql.createPool({
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'ba33c92061e72d',
  password: '44ed5e4e',
  database: 'heroku_92a3d28c7bb8175',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) return;
    if (connection) connection.release();
})

db.connect((err) => {
    if (err) throw err;
    console.log('Database connected.')
  })

module.exports = { db: db, pool: pool};