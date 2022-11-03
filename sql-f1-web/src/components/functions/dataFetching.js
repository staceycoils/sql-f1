function getDrivers(arr,year) {
    fetch(`http://localhost:9090/api/drivers?year=${year.value}`)
    .then(response => response.json())
    .then(info => {
        arr.value.push(info);
    });
}

function getAllDrivers(arr) {
    fetch(`http://localhost:9090/api/drivers`)
    .then(response => response.json())
    .then(info => {
        arr.value.push(info);
    });
}

function getSingleDriver(arr, name, fullName) {
    fetch(`http://localhost:9090/api/driver?name=${name}`)
    .then(response => response.json())
    .then(info => {
        arr.value = [name, info, fullName];
    })
    .catch((e)=>{console.log(e)})
}

function getResults(arr,year) {
    fetch(`http://localhost:9090/api/races?year=${year.value}`)
    .then(response => response.json())
    .then(info => {
        arr.value.push(info);
    });
}

function getPoints(arr) {
    fetch('http://localhost:9090/api/points')
    .then(response => response.json())
    .then(info => {
        arr.value.push(info);
    });
}

export {
    getDrivers,
    getAllDrivers,
    getSingleDriver,
    getPoints,
    getResults
}