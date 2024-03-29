function getDrivers(arr,year) {
    fetch(`https://sql-f1-project.herokuapp.com/api/drivers?year=${year.value}`)
    .then(response => response.json())
    .then(info => {
        arr.value.push(info);
    })
    .catch((e)=>{console.log(e)});
}

function getAllDrivers(arr) {
    fetch(`https://sql-f1-project.herokuapp.com/api/drivers`)
    .then(response => response.json())
    .then(info => {
        arr.value.push(info);
    })
    .catch((e)=>{console.log(e)});
}

function getSingleDriver(arr, name, fullName) {
    fetch(`https://sql-f1-project.herokuapp.com/api/driver?name=${name}`)
    .then(response => response.json())
    .then(info => {
        arr.value = [name, info, fullName];
    })
    .catch((e)=>{console.log(e)});
}

function getResults(arr,year) {
    fetch(`https://sql-f1-project.herokuapp.com/api/races?year=${year.value}`)
    .then(response => response.json())
    .then(info => {
        arr.value.push(info);
    })
    .catch((e)=>{console.log(e)});
}

function getPoints(arr) {
    fetch('https://sql-f1-project.herokuapp.com/api/points')
    .then(response => response.json())
    .then(info => {
        arr.value.push(info);
    })
    .catch((e)=>{console.log(e)});
}

export {
    getDrivers,
    getAllDrivers,
    getSingleDriver,
    getPoints,
    getResults
}