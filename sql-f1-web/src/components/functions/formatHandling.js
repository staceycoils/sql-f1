function formatCell(
        cell, 
        row, 
        index, 
        selectedPoints,
        pointsList,
        resultsList
        ) {
    if (index === 0) return 'rowDataName';
    if (index === row.length-1) return 'rowDataNum';

    let classType = "rowDataNum ";
    if (cell === "X") {
        classType += "rowDataNoData";
        return classType;
    };
    if (cell === 0) classType += "rowDataNoScore";
    const points = selectedPoints === null ? pointsList.value[0][5] : pointsList.value[0][selectedPoints.value]
    for (const pos in points) {
        if (cell === points[pos] && pos !== 'id' && pos !== 'FL' && pos.slice(-2) !== 'th') {
            classType += `rowData${pos}`
        } 
    }
    if (classType === "rowDataNum ") classType += "rowDataScore";
    classType += formatFLap(cell,row,index,resultsList);
    classType += formatPole(cell,row,index,resultsList);
    return classType;
}

function formatFLap(c,r,i,resultsList) {
    if (resultsList.value[0][0] === undefined 
        || i > resultsList.value[0].length
        || typeof c === 'string') return;
    return resultsList.value[0][i-1].fastest === r[0] ? " fl" : " " ;
}

function formatPole(c,r,i,resultsList) {
    if (resultsList.value[0][0] === undefined 
        || i > resultsList.value[0].length
        || typeof c === 'string') return;
    return resultsList.value[0][i-1].pole === r[0] ? " pole" : " " ;
}

export {
    formatCell
};