<script setup>
import { ref } from 'vue';
import SeasonPage from './SeasonPage.vue';
import DriverPage from './DriverPage.vue';

let displayPage = ref('');
</script>

<template>
    <div id="displayChoiceButtons">
        <button @click="
            displayPage === 'season' ? displayPage = null : displayPage = 'season'
        ">
            Compare Season
        </button>
        <button @click="
            displayPage === 'drivers' ? displayPage = null : displayPage = 'drivers'
        ">
            Compare Drivers
        </button>
    </div>
    <div id="content">
        <SeasonPage v-if="displayPage === 'season'"/>
        <DriverPage v-if="displayPage === 'drivers'"/>
    </div>
</template>

<style scoped>
#displayChoiceButtons {
    display: flex;
    justify-content: center;
    grid-gap: 100px;
}

button {
    width: 200px;
    height: 50px;
    font-size: 16pt;
    font-family: Verdana, Arial, Helvetica, sans-serif;
}

#content {
    margin-top: 20px;
}
</style>