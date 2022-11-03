function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

function assignPoints(results, points) {
    const arr = [];
    results.map((position, index) => {
        if (!position) return
        const num = (
            (position.slice(-2))-10 <= 0 ? position.slice(-1) : position.slice(-2)
        )
        for (place in points) {
            if (num === place.slice(0,-2) && points[place] !== null) {
                arr.push(points[place])
            }
        }
        if (arr.length !== index + 1) arr.push(0);
    })
    return arr;
}

document.addEventListener('DOMContentLoaded', function () {
    const data = {
        races: [],
        points: [],
        drivers: []
    };

    fetch('http://localhost:9090/api/points')
    .then(response => response.json())
    .then(info => {
        data.points = info[5]
    });
    fetch('http://localhost:9090/api/drivers')
    .then(response => response.json())
    .then(info => {
        data.drivers = info
    });
    fetch('http://localhost:9090/api/races')
    .then(response => response.json())
    .then(info => {
        data.races = info
    })
    .then(()=>{
        const target = document.querySelector('table');
        const rowList = [];
        let targetHTML = "";
        const rosetta = [];

        if (data.drivers.length === 0) {
            return null
        }
        else data.drivers.map((driver, index)=>{
            if (driver.firstName === 'Jérôme') return;

            const results = data.races.map((race)=>{
                return getKeyByValue(race,`${driver.firstName[0]} ${driver.surname}`)
            })
            rowList.push(`
            <tr>
            <td>${driver.firstName} ${driver.surname}</td>
            `);
            const values = (assignPoints(results, data.points));
            values.map((value)=>{
                rowList[index] += `
                    <td>${value}</td>
                `
            });
            const total = values.reduce((prev,curr)=>{
                return prev+curr
            });
            rowList[index] += `<td>${total}</td></tr>`;
            rosetta.push([
                total-10 < 0 ? `0${total}` : total
                , index])
            
        })
        console.log(rosetta)
        console.log(rosetta.sort().reverse())
        // rowList.forEach((i) => {
        //     targetHTML += `${i}`;
        // });
        rosetta.sort().reverse().forEach((i) => {
            targetHTML += `${rowList[i[1]]}`;
        });
        target.innerHTML += targetHTML;
    });


















});