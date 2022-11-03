const callAxios = require('./axios');
const db = require('./test');

const testSuite = true;

callAxios('get','http://ergast.com/api/f1/2012/drivers.json')
    .then((data)=>{
        data.DriverTable.Drivers.map((driver, index)=>{
            db.query(`
                INSERT INTO drivers 
                VALUES (
                    ${index},"${driver.givenName}", "${driver.familyName}", "${driver.nationality}"
                )
            `)
        })
    })