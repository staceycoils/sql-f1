function assignPoints(position, fLap, selectedPoints) {
    const points = selectedPoints.value
    if (!position) return "X";
    const num = (
        (position.slice(-2))-10 < 0 ? position.slice(-1) : position.slice(-2)
    )
    for (const place in points) {
        if (num === place.slice(0,-2) && points[place] !== null) {
            if (points['FL'] === null) return points[place]
            else return fLap ? points[place]+1 : points[place]
        }
    }
    return 0 + ( points['FL'] !== null && fLap ? 1.00 : 0 );
}

function generateTable(driverList, resultsList) {
    let rowList = [];
    if (driverList.value[0] === undefined || resultsList.value[0] === undefined) return;
    driverList.value[0].map((driver, index)=>{
        const ident = `${driver.firstName[0]} ${driver.surname}`;
        rowList.push([ident]);
        resultsList.value[0].map((race)=>{
            const fastestLap = race.fastest === ident ? true : false
            const position = Object.keys(race).find(key => race[key] === ident)
            const points = assignPoints(position, fastestLap, selectedPoints)
            rowList[index].push(points)
        })
        let total = 0;
        for (let t = 0 ; t < rowList[index].length ; t++) {
            if (typeof rowList[index][t] !== 'string') total += rowList[index][t];
        }
        rowList[index].push(total)
    })
    const seasonLength = resultsList.value[0].length;
    rowList.sort((a,b)=>{return a[seasonLength+1] - b[seasonLength+1]}).reverse()
    loadingMsg.value = '';
    return(rowList)
}

export {
    assignPoints,
    generateTable
}