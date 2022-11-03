const callAxios = require('./axios');
const db = require('./test');

const testSuite = true;

for (let year = 1950; year <= 1959; year++) {
    callAxios('get',`http://ergast.com/api/f1/${year}/driverStandings.json`)
        .then((details)=>{
            const data = details.StandingsTable.StandingsLists[0];
            // console.log(data.DriverStandings.length)
            // db.query(`
            //     SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
            //     WHERE TABLE_NAME = N'races'
            //     AND TABLE_SCHEMA = 'sql_f1_ops'
            //     AND COLUMN_NAME = 'res${data.DriverStandings.length}';
            // `,
            // function (e, res) {
            //     console.log(res)
            //     if (res.length >= 1) {
            //         console.log(6353552523)
            //         db.query(`
            //             ALTER TABLE races
            //             ADD res${data.DriverStandings.length} VARCHAR(20) DEFAULT NULL;
            //         `,)
            //     }
            //     else console.log(3675683686424)
            // })
            for (let i = 1; i <= (testSuite ? 2 : data.round); i++) {
                callAxios('get',`http://ergast.com/api/f1/${data.season}/${i}/results.json`)
                    .then((info)=>{
                        const data = info.RaceTable.Races[0];
                        if (data === undefined) return;
                        const id = data.round < 10 ? `${data.season}0${data.round}` : `${data.season}${data.round}`;
                        const {season, round} = data;
                        const circuit = data.Circuit.circuitId;
                        let columns = "";
                        let results = "";
                        data.Results.map((i)=>{
                            i.position < 10 ? columns += `, res0${i.position}` : columns += `, res${i.position}`
                            results += `,"${i.Driver.givenName.slice(0,1)} ${i.Driver.familyName}"`;
                        })
                        if (season === '1960' && round === '1') {
                            columns = columns.replace('res03, ','')
                            results = results.replace('"S Moss","M Trintignant"', 'NULL')
                        } //-------//
                        db.query(`
                            INSERT INTO races (id, seasonYear, round, circuit${columns}) VALUES
                            (${id},${season},${round},'${circuit}'${results})
                        `, 
                        (err) => {console.log(season, i, err)});
                    })
                    .catch((e)=>{
                        console.log(e)
                        i = 40
                    })
            }
        })
        .catch((e)=>{
            throw new Error(e)
        })

}   