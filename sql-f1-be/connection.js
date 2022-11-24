const mysql = require('mysql2');

const ENV = process.env.NODE_ENV || 'development';
const FILENAME = ENV === 'test' ? '_test' : '';

const databaseInfo = ENV === 'production' ? {
  host: process.env.CLEARDB_DATABASE_URL.slice(32,59),
  user: process.env.CLEARDB_DATABASE_URL.slice(8,22),
  password: process.env.CLEARDB_DATABASE_URL.slice(23,31),
  database: process.env.CLEARDB_DATABASE_URL.slice(60,82)
} : require(`./db_info${FILENAME}`);

if (!databaseInfo) {
    console.log("NO DETAILS GIVEN");
    throw new Error();
}

const db = mysql.createConnection(databaseInfo);

if (ENV === 'production') {
  const pool = mysql.createPool({
    host: process.env.CLEARDB_DATABASE_URL.slice(32,59),
    user: process.env.CLEARDB_DATABASE_URL.slice(8,22),
    password: process.env.CLEARDB_DATABASE_URL.slice(23,31),
    database: process.env.CLEARDB_DATABASE_URL.slice(60,82),
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