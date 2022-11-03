function assignPoints(pointsList, selectedPoints,position, fLap) {
    const points = selectedPoints.value === null ? pointsList.value[0][5] : pointsList.value[0][selectedPoints.value]
    if (!position) return 0;
    const num = (
        (position.slice(-2))-10 < 0 ? position.slice(-1) : position.slice(-2)
    )
    if (points['FL'] !== null && fLap) console.warn('FASTEST LAP', points['FL'])
    for (const place in points) {
        if (num === place.slice(0,-2) && points[place] !== null) {
            if (points['FL'] === null) return points[place]
            else return fLap ? points[place]+1 : points[place]
        }
    }
    return 0 + ( points['FL'] !== null && fLap ? 1 : 0 );
}

function generateTable(driverList) {
    let rowList = [];
    if (driverList.value[0] === undefined) return
    driverList.value[0].map((driver, index)=>{
        const ident = `${driver.firstName[0]} ${driver.surname}`;
        rowList.push([ident]);
        if (resultsList.value[0] === undefined) return
        resultsList.value[0].map((race)=>{
            const fastestLap = race.fastest === ident ? true : false
            const position = Object.keys(race).find(key => race[key] === ident)
            const points = assignPoints(pointsList, selectedPoints, position, fastestLap)
            rowList[index].push(points)
        })
        const total = rowList[index].slice(1).reduce((prev,curr)=>{
            return prev+curr
        });
        rowList[index].push(total)
    })
    const seasonLength = resultsList.value[0].length
    rowList.sort((a,b)=>{return a[seasonLength+1] - b[seasonLength+1]}).reverse()
    return(rowList)
}

export {
    assignPoints,
    generateTable
}