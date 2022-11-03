import { createConnection } from 'mysql2';
import databaseInfo from '../../db_info';

if (!databaseInfo) {
    console.log("NO DETAILS GIVEN");
    throw new Error();
}

const db = createConnection(databaseInfo);

console.log(db.connect)

db.connect(function() {
    db.query('SELECT name FROM drivers;', function (err, result, fields) {
      console.log("Result: " + result);
    });
  });