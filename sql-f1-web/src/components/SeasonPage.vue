<script setup>
import { ref, onUpdated, watch } from 'vue';
import { getDrivers, getPoints, getResults } from './functions/dataFetching.js';
import { assignPoints } from './functions/dataHandling'
import pointData from './points.js'
import TableKeys from './TableKeys.vue';

const years = [];
const currentYear = new Date().getFullYear();
for (let i = 1960; i <= currentYear; i++) {
    years.unshift(i)
}

let loadingMsg = ref('');

let flBank = ref([]);

const selectedYear = ref(null)
const selectedPoints = ref(null)

let driverList = ref([])
const resultsList = ref([])
const pointsList = ref([pointData])

async function getInfo() {
    driverList.value = [];
    resultsList.value = [];
    loadingMsg.value = 'Fetching data, please wait...';
    await getDrivers(driverList, selectedYear);
    await getResults(resultsList, selectedYear);
    pointData.map((i)=>{
        if (selectedYear.value <= i.endDate && selectedYear.value >= i.startDate) {
            selectedPoints.value = (i)
        }
    })
}

function changePoints(index) {
    selectedPoints.value = pointData[index]
}

function generateTable() {
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
    loadingMsg.value = null;
    return(rowList)
}

function generateColumns() {
    let columnRef = [];
    columnRef.push('Name');
    if (resultsList.value[0] === undefined) return;
    for (let i = 1 ; i <= resultsList.value[0].length ; i++) {
        columnRef.push(i)
    }
    columnRef.push('Total');
    return columnRef
}

function formatCell(cell, row, index) {
    if (index === 0) return 'rowDataName';
    if (index === row.length-1) return 'rowDataNum';

    let classType = "rowDataNum ";
    if (cell === "X") {
        classType += "rowDataNoData";
        return classType;
    };
    if (cell === 0) classType += "rowDataNoScore";
    const points = selectedPoints.value;
    for (const pos in points) {
        if (cell === points[pos] && pos !== 'id' && pos !== 'FL' && pos.slice(-2) !== 'th') {
            classType += `rowData${pos}`
        } 
    }
    if (classType === "rowDataNum ") classType += "rowDataScore";
    classType += formatFLap(cell,row,index);
    classType += formatPole(cell,row,index);
    return classType;
}

function formatFLap(c,r,i) {
    if (resultsList.value[0][0] === undefined 
        || i > resultsList.value[0].length
        || typeof c === 'string') return;
    return resultsList.value[0][i-1].fastest === r[0] ? " fl" : " " ;
}

function formatPole(c,r,i) {
    if (resultsList.value[0][0] === undefined 
        || i > resultsList.value[0].length
        || typeof c === 'string') return;
    return resultsList.value[0][i-1].pole === r[0] ? " pole" : " " ;
}
</script>

<template>
    <div id="seasonPage">
        <p id="selectionBoxes">
            <select id="selectYear" v-model="selectedYear" @change="getInfo()">
                <option disabled value="">Select Year</option>
                <option v-for="year in years" :key="`season${year}`">{{ year }}</option>
            </select>
            <select id="selectPoints" v-if="selectedYear" @change="(e)=>{changePoints(e.target.value)}">
                <option selected disabled value="">Select Point Method</option>
                <option v-for="pointType in pointData" :value="pointType.id-1">
                    {{ pointType.pointMethod }}
                </option>
            </select>
        </p>
        {{ loadingMsg }}
        <div id='tableHolder'>
            <TableKeys v-if="loadingMsg === null"/>
            <table v-if="selectedYear">
                <th v-for="column in generateColumns()">
                    {{ column }}
                </th>
                <tr v-for="row in generateTable()" >
                    <td v-for="(cell, index) in row" :class="formatCell(cell, row, index)">
                        {{ cell === 'X' ? null : cell}}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style scoped>
div#seasonPage {
    background-color: rgb(180,180,180);
    height: 600px;
    padding: 20px;
    overflow-x: scroll;
}

#selectionBoxes {
    display: flex;
    justify-content: center;
    grid-gap: 20px;
}

select {
    margin-bottom: 20px;
    height: 40px;
}

#selectYear {
    text-align: center;
}

#selectPoints {
    width: max-content;
    padding-left: 10px;
    padding-right: 20px;
}

#tableHolder {
    width: fit-content;
    margin: auto;
}

/* Table setup */

table {
    background-color: rgb(255,255,255);
    border: 1px solid black;
    margin: auto;
    padding-bottom: 5px;
    font-size: 90%;
}

th {
    font-weight: bold;
}

th#totalHeader {
    min-width: 50px;
}

td.rowDataName {
    min-width: 50px;
    text-align: left;
    padding-left: 5px;
    padding-right: 10px;
}
td.rowDataNum {
    width: 40px;
    text-align: center;
}

/* Table colours for different points */

td.rowData1st {
    background-color: rgb(200,200,100);
}
td.rowData2nd {
    background-color: rgb(150,150,150);
}
td.rowData3rd {
    background-color: rgb(205, 127, 50);
}
td.rowDataScore {
    background-color: rgb(150,150,255);
}
td.rowDataNoScore {
    background-color: rgb(180,180,180);
}
td.rowDataNoData {
    background-color: rgb(255,255,255);
}
td.rowDataTest {
    background-color: rgb(221,160,221);
}
td.fl {
    border: 2px purple solid;
}
td.pole {
    border: 2px blue solid;
}
td.fl.pole {
    border: 2px green solid;
}
</style>