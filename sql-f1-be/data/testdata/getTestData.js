const callAxios = require("../../axios");
const db = require("../../connection");

function seedDrivers() {
    for (let year = 2001 ; year <= 2012 ; year++) {
        var allDriverTotal = 0;
        var allDriverAdded = 0;
        callAxios("get", `http://ergast.com/api/f1/${year}/drivers.json?limit=100`)
            .then((data)=>{
                const driverTotal = data.DriverTable.Drivers.length
                allDriverTotal += driverTotal;
                console.log(data.url + ", adding " + driverTotal + " drivers, " + allDriverTotal + " overall.")
                data.DriverTable.Drivers.map((i, index)=>{
                    db.query(`
                        INSERT INTO drivers (id, year, firstName, surname, country)
                        VALUES (${year}${
                            index < 10 ? `0${index}` : index
                        }, ${year}, "${i.givenName}","${i.familyName}","${i.nationality}");
                    `, (err,data) => {
                        if (err) throw err;
                        allDriverAdded++;
                        console.log("Added " + i.givenName + " " + i.familyName + ", " + year + " " + (index+1) + " of " + driverTotal + ", " + 
                        allDriverAdded + " of " + allDriverTotal + " total (" + (allDriverAdded/allDriverTotal*100).toFixed(1) + "%)")
                        if (allDriverAdded === allDriverTotal) console.log("Finished addding drivers to db!")
                    })
                })
            })
    }
}

function seedRaces() {
    for (let year = 2001 ; year <= 2012 ; year++) {
        var allRaceTotal = 0;
        var allRaceAdded = 0;
        callAxios('get',`http://ergast.com/api/f1/${year}/driverStandings.json`)
            .then((details)=>{
                const data = details.StandingsTable.StandingsLists[0];
                const raceTotal = data.round * 1;
                allRaceTotal += raceTotal;
                for (let i = 1; i <= data.round; i++) {
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
                            db.query(`
                                INSERT INTO races (id, seasonYear, round, pole, fastest, circuit${columns}) VALUES
                                (${id},${season},${round},"${pole}","${fastestLap}",'${circuit}'${results})
                            `, (err,data) => {
                                if (err) throw err;
                                allRaceAdded++;
                                console.log("Added " + season + " round " + round + " of " + raceTotal + ", " + 
                                allRaceAdded + " of " + allRaceTotal + " total (" + (allRaceAdded/allRaceTotal*100).toFixed(1) + "%)")
                                if (allRaceAdded === allRaceTotal) console.log("Finished addding races to db!")
                            });
                        })
                }
            })
    }
}

module.exports = {
    'testData': {
        'seedDrivers': seedDrivers,
        'seedRaces': seedRaces
    }
}