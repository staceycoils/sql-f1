const callAxios = require("../../axios");
const db = require("../../test");

function seedDrivers() {
    callAxios("get", "http://ergast.com/api/f1/2012/drivers.json")
        .then((data)=>{
            data.DriverTable.Drivers.map((i)=>{
                db.query(`
                    INSERT INTO drivers (firstName, surname, country)
                    VALUES ("${i.givenName}","${i.familyName}","${i.nationality}");
                `)
            })
        })
}

function seedRaces() {
    callAxios('get',`http://ergast.com/api/f1/${2012}/driverStandings.json`)
        .then((details)=>{
            const data = details.StandingsTable.StandingsLists[0];
            for (let i = 1; i <= 6; i++) {
                callAxios('get',`http://ergast.com/api/f1/${data.season}/${i}/results.json`)
                    .then((info)=>{
                        const data = info.RaceTable.Races[0];
                        if (data === undefined) return;
                        const id = data.round < 10 ? `${data.season}0${data.round}` : `${data.season}${data.round}`;
                        const {season, round} = data;
                        const circuit = data.Circuit.circuitId;
                        let columns = "";
                        let results = "";
                        let pole = "";
                        let fastestLap = "";
                        data.Results.map((i)=>{
                            if (i.grid === "1") pole += `${i.Driver.givenName.slice(0,1)} ${i.Driver.familyName}`;
                            i.position < 10 ? columns += `, res0${i.position}` : columns += `, res${i.position}`;
                            results += `,"${i.Driver.givenName.slice(0,1)} ${i.Driver.familyName}"`;
                            if (i.FastestLap === undefined) return;
                            if (i.FastestLap.rank === "1") fastestLap += `${i.Driver.givenName.slice(0,1)} ${i.Driver.familyName}`;
                        })
                        // if (season === '1960' && round === '1') {
                        //     columns = columns.replace('res03, ','')
                        //     results = results.replace('"S Moss","M Trintignant"', 'NULL')
                        // } 
                        db.query(`
                            INSERT INTO races (id, seasonYear, round, pole, fastest, circuit${columns}) VALUES
                            (${id},${season},${round},"${pole}","${fastestLap}",'${circuit}'${results})
                        `);
                    })
            }
        })
}

// seedDrivers();
seedRaces();