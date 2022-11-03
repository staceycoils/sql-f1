<script setup>
import { ref, watch } from 'vue';
import { getAllDrivers, getSingleDriver, getPoints } from './functions/dataFetching'
import pointData from './points.js'

let disabled = {
    button: false
};
let options = ref({
    pole: false,
    lap: false,
    percentage: false,
    points: false,
    display: false
})
const pointsList = ref([pointData]);

let driverList = ref([]);
getAllDrivers(driverList);
let fullDriverList = ref([]);
getAllDrivers(fullDriverList);

function modifyDriverList(action, data) {
    if (action === "remove") driverList.value[0].splice(data,1);
    if (action === "add") {
        driverList.value[0].splice(data.arrNum,0,fullDriverList.value[0][data.arrNum])
    };
    if (action === "restore") {
        driverList.value = [];
        getAllDrivers(driverList);
    };
}

let selectedDriver = ref([]);
function selectDriver(n) {
    selectedDriver.value = n;
}

const tableList = ref([]);
const tableLength = ref(0);
const selectedPoints = ref(6);

const newDriver = ref([]);
async function addDriver() {
    if (selectedDriver.value.length === 0) return;
    disabled.button = true;
    newDriver.value = [];
    const names = selectedDriver.value.split(",");
    await getSingleDriver(newDriver, names[0], names[1]);
    selectedDriver.value = [];
}
watch(newDriver,()=>{
    if (newDriver.value.length === 0) return;
    const driver = {
        name: newDriver.value[0],
        arrNum: newDriver.value[2],
        poles: 0,
        fastestLaps: 0
    };
    modifyDriverList("remove", driver.arrNum);
    newDriver.value[1].map((race, index) => {
        for (const position in race) {
            if (race[position] === driver.name && position === "pole") {
                driver.poles += 1;
            } else if (race[position] === driver.name && position === "fastest") {
                driver.fastestLaps += 1;
            } else if (race[position] === driver.name) {
                driver[position.slice(-2)] === undefined ? 
                driver[position.slice(-2)] = 1 :
                driver[position.slice(-2)] += 1;
            };
        }
    })
    tableList.value.push(driver);
    calculateLength();
    disabled.button = false;
})

function calculateLength() {
    let max = 0;
    tableList.value.map((standings)=>{
        for (const position in standings) {
            if (position === 'name' || position === 'poles' || position === 'fastestLaps') return;
            if (parseInt(position) > max) max = position;
        }
    })
    tableLength.value = max;
}

function calculateColumns() {
    const arr = [];
    for (let i = 1; i <= tableLength.value; i++) {
        arr.push(i)
    };
    return arr;
}

function displayCell(row, index) {
    if (options.value.display === 'percentage') {
        return displayPercentageCells(row, index)
    } else if (options.value.display === 'points') {
        return displayCellWithPoints(row, index)
    } else {
        if (typeof index === 'object') {
            let total = 0;
            for (const position in row) {
                if (position !== 'name' 
                    && position !== 'fastestLaps' 
                    && position !== 'poles'
                    && position !== 'arrNum') total += row[position];
            }
            return total;
        }
        return row[index] ? row[index] : (row[`0${index}`] ? row[`0${index}`] : "-")
    }
}

function displayCellWithPoints(row, index) {
        const points = pointData[selectedPoints.value];
        if (typeof index === 'object') {
            let total = 0;
            for (const position in row) {
                const num = (
                    (position.slice(-2))-10 < 0 ? position.slice(-1) : position.slice(-2)
                )
                for (const place in points) {
                    if (num === place.slice(0,-2)) total += (points[place] * row[position])
                }
            }
            if (points['FL'] !== null && index[0]) total += row.fastestLaps * points['FL'];
            return total;
        } else {
            const finishes = (
                row[index] ? row[index] : (row[`0${index}`] ? row[`0${index}`] : 0)
            )
            if (index === 'fastestLaps') return points['FL'] * finishes;
            for (const place in points) {
                if (index == place.slice(0,-2) && points[place] !== null) {
                    return points[place] * finishes;
                }
            }
            return 0
        }
}

function displayPercentageCells(row, index) {
    let total = 0;
    for (const position in row) {
        if (position !== 'name' 
            && position !== 'fastestLaps'
            && position !== 'poles'
            && position !== 'arrNum') total += row[position];
    }
    return row[index] ? 
        `${(row[index] / total * 100).toPrecision(2)}%` : 
        (row[`0${index}`] ? `${(row[`0${index}`] / total * 100).toPrecision(2)}%` : "-")
}

function clearTable() {
    modifyDriverList("restore");
    tableList.value = [];
    calculateLength();
}

function removeDriver(i, row) {
    modifyDriverList("add", row);
    tableList.value.splice(i,1);
    calculateLength();
}
</script>

<template>
    <div id="driverPage">
        <section>
            <p id="driverSelectBoxes">
                <select @change="(e)=>{selectDriver(e.target.value)}" id="driverSelect">
                    <option selected value="">Select a driver</option>
                    <option v-for="(driver, index) in driverList[0]"
                    :value="[driver.firstName[0] + ' ' + driver.surname, index]">
                        {{ driver.firstName }} {{ driver.surname }}
                    </option>
                </select>
                <button @click="()=>{addDriver()}" :disabled='disabled.button'>
                    Add Driver
                </button>
            </p>
            <p id="selectionOptions">
                <input type="checkbox" id="poleCheckBox" v-model="options.pole"/>
                    <label for="poleCheckBox">Poles</label>
                <input type="checkbox" id="lapCheckBox" v-model="options.laps"/>
                    <label for="lapCheckBox">Fastest Laps</label>
                <input type="checkbox" id="totalCheckBox" v-model="options.total"/>
                    <label for="totalCheckBox">Totals</label>
                <input type="checkbox" id="displayCheckBox" v-model="options.display" true-value="points" false-value="false"/>
                    <label for="displayCheckBox">Points</label>
                <input type="checkbox" id="percentCheckBox" v-model="options.display" true-value="percentage" false-value="false"/>
                    <label for="percentCheckBox">Percentages</label>
                <select v-if="options.display === 'points'" v-model="selectedPoints" id="pointsSelect">
                    <option v-for="pointType in pointData" :value="pointType.id-1">
                        {{ pointType.pointMethod }}
                    </option>
                </select>
            </p>
        </section>
        <table >
            <tr>
                <th class="name">Driver</th>
                <th v-if="options.pole" class="num">P</th>
                <th v-if="options.laps" class="num">FL</th>
                <th v-for="num in calculateColumns()" class="num">{{ num }}</th>
                <th v-if="options.total" class="num">Total</th>
            </tr>
            <tr v-for="(row, index) in tableList">
                <td class="name">
                    <button @click="()=>{removeDriver(index, row)}" class="removeButton" >X</button>
                    {{ row.name }}
                </td>
                <td v-if="options.pole" class="num pole">
                    {{ displayCell(row, "poles") }}
                </td>
                <td v-if="options.laps" class="num fLaps">
                    {{ displayCell(row, "fastestLaps") }}
                </td>
                <td v-for="num in calculateColumns()" class="num">
                    {{ displayCell(row, num) }}
                </td>
                <td v-if="options.total" class="num">
                    {{ displayCell(row, [options.laps, options.pole]) }}
                </td>
            </tr>
        </table>
        <button v-if="tableList.length > 0" @click="()=>{clearTable()}" id="clearButton">
            Clear Table
        </button>
    </div>
</template>

<style scoped>
div#driverPage {
    background-color: rgb(180,180,180);
    width: 100%;
    height: 100%;
    padding: 2%;
    overflow-x: scroll;
}

section {
    display: grid;
    grid-template-columns: 50% 50%;
}

#selectionOptions {
    text-align: right;
}

label {
    padding-right: 19px;
}

#pointsSelect {
    margin-right: 20px;
}

#driverSelectBoxes {
    display: grid;
    grid-template-columns: auto;
}
#driverSelectBoxes button {
    width: 100px;
}

#driverSelect {
    width: 300px;
}










table {
    background-color: rgb(255,255,255);
    border: 1px solid black;
    margin: auto;
    margin-top: 5px;
    margin-bottom: 5px;
    padding-bottom: 5px;
    font-size: 90%;
}

th {
    font-weight: bold;
}
th#totalHeader {
    min-width: 50px;
}

td { 
    background-color: white;
}
.name { 
    width: 160px;
}
.num { 
    text-align: center;
    width: 30px;
}

.removeButton {
    color: red;
    border: none;
}

.pole {
    background-color: #ffaaff;
}
.fLaps {
    background-color: #aaffaa;
}
#clearButton {
    display: block;
    width: 200px;
    height: 40px;
    font-size: 18pt;
    margin-left: auto;
    margin-right: auto;
}

</style>