const mysql = require('mysql2');

const ENV = process.env.NODE_ENV || 'development';
const FILENAME = ENV === 'test' ? '_test' : '';

const databaseInfo = ENV === 'production' ? {
  host: 'sql8.freemysqlhosting.net',
  user: 'sql8591114',
  password: 'EBHLArSeXY',
  database: 'sql8591114'
} : require(`./db_info${FILENAME}`);

if (!databaseInfo) {
    console.log("NO DETAILS GIVEN");
    throw new Error();
}

const db = mysql.createConnection(databaseInfo);

if (ENV === 'production') {
  const pool = mysql.createPool({
    host: 'sql8.freemysqlhosting.net',
    user: 'sql8591114',
    password: 'EBHLArSeXY',
    database: 'sql8591114',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  pool.getConnection((err, connection) => {
      if (err) return;
      if (connection) connection.release();
  })

} else {
  pool = db
}

db.connect((err) => {
    if (err) throw err;
    console.log('Database connected.')
  })

module.exports = { db: db, pool: pool };
