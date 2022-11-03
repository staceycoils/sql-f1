<script setup>
import { ref, onUpdated } from 'vue';
import {getDrivers, getPoints, getResults} from './functions/dataFetching.js';
import {formatFastest} from './functions/formatHandling.js'

const years = []
for (let i = 1990; i < 2021; i++) {
    years.push(i)
}

let flbank = ref([]);
let loading = ref(false);

const selectedYear = ref(null)
const selectedPoints = ref(null)
let driverList = ref([])
const resultsList = ref([])
const pointsList = ref([])
getPoints(pointsList);

async function getInfo() {
    driverList.value = [];
    resultsList.value = [];
    loading.value = true;
    await getDrivers(driverList, selectedYear);
    await getResults(resultsList, selectedYear);
    loading.value = false;
    formatFLap();
}

function assignPoints(position, fLap) {
    const points = selectedPoints.value === null ? pointsList.value[0][5] : pointsList.value[0][selectedPoints.value]
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

function generateTable() {
    let rowList = [];
    if (driverList.value[0] === undefined) return
    driverList.value[0].map((driver, index)=>{
        const ident = `${driver.firstName[0]} ${driver.surname}`;
        rowList.push([ident]);
        if (resultsList.value[0] === undefined) return
        resultsList.value[0].map((race)=>{
            const fastestLap = race.fastest === ident ? true : false
            const position = Object.keys(race).find(key => race[key] === ident)
            const points = assignPoints(position, fastestLap)
            rowList[index].push(points)
        })
        let total = 0;
        for (let t = 0 ; t < rowList[index].length ; t++) {
            if (typeof rowList[index][t] !== 'string') total += rowList[index][t];
        }
        rowList[index].push(total)
    })
    const seasonLength = resultsList.value[0].length
    rowList.sort((a,b)=>{return a[seasonLength+1] - b[seasonLength+1]}).reverse()
    return(rowList)
}

function generateColumns() {
    let columnRef = []
    for (let i = 1 ; i <= resultsList.value[0].length ; i++) {
        columnRef.push(i)
    }
    return columnRef
}

function setPoints(v) {
    console.log(selectedPoints.value)
}

function formatCell(value, row, index) {
    if (index === row.length-1 || typeof value === 'string') return;
    if (value === null) return "rowDataNoData";
    if (value === 0) return "rowDataNoScore";
    const points = selectedPoints.value === null ? pointsList.value[0][5] : pointsList.value[0][selectedPoints.value]
    for (const pos in points) {
        if (value === points[pos] && pos !== 'id' && pos !== 'FL' && pos.slice(-2) !== 'th') {
            return `rowData${pos}`
        } 
    }
    return "rowDataScore";
}

function formatFLap() {
    if (resultsList.value[0] === undefined) return;
    flbank.value = [];
    resultsList.value[0].map((i,index)=>{
        flbank.value.push(i.fastest);
    })
    console.log(flbank.value)
}
</script>

<template>
    <div id="driverPage" v-if="!loading.value">
        <select v-model="selectedYear" @change="getInfo()">
            <option disabled value="">Select Year</option>
            <option v-for="year in years" :key="`season${year}`">{{ year }}</option>
        </select>
        {{ selectedYear }}
        <select v-if="selectedYear" v-model="selectedPoints">
            <option disabled value="">Select Points</option>
            <option v-for="pointType in pointsList[0]" :value="pointType.id-1">
                {{ pointType.pointMethod }} 1st: {{ pointType['1st'] }} 2nd {{ pointType['2nd'] }} 
            </option>
        </select>
        {{ selectedPoints }}
        <table v-if="selectedYear">
            <th>Name</th>
            <th v-for="column in generateColumns()">
                {{ column }}
            </th>
            <th>Total</th>
            <tr v-for="row in generateTable()" >
                <td v-for="(cell, index) in row" :class="`
                    ${typeof(cell) === 'number' ? 'rowDataNum' : null }
                    ${index === 0 ? 'rowDataName' : null }
                    ${formatCell(cell, row, index)}
                    ${flbank[index-1] === row[0] ? 'pie' : 'tato'}
                `">
                    {{ cell === 'X' ? null : cell}}
                </td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
div#driverPage {
    background-color: rgb(180,180,180);
    width: 100%;
    height: 100%;
    padding: 2%;
}

table {
    background-color: rgb(255,255,255);
    border: 1px solid black;
    /* border-collapse: collapse; */
}

td.rowDataName {
    width: 14%;
    text-align: left;
    padding-left: 5px
}

td.rowDataNum {
    width: calc(100% / 25);
    text-align: center;
}
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
td.pie {
    border: 1px purple solid;
}
</style>