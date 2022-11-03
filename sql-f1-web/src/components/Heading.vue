<script setup>
</script>

<template>
    <div id="titleBlock">
        <h1>
            StandingsSlider
            <p id="subtitle">
            The F1 Points Recombulator
            </p>
        </h1>
    </div>
    <div>
        <p id="tagline">
            A tool to compare Formula 1 seasons, point systems and driver histories.
            <br />
            Built using the Ergast Developer API.
        </p>
    </div>
</template>

<style scoped>
span {
    display: flex;
    align-items: end;
    height: auto;
    width: 50%;
    padding-top: 10px;
    padding-bottom: 10px;
}
div {
    width: 50%;
    min-width: 300px;
    padding-left: 20px;
    padding-right: 20px;
    font-style: oblique;
}
h1 {
    width: 100%;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 50px;
}
p {
    width: 100%;
}

#titleBlock {
}

#subtitle {
    position: relative;
    font-size: 16px;
    left: 195px;
    top: -25px;
}

#tagline {
    text-align: right;
    font-weight: bold;
    line-height: 1.2;
    margin-bottom: 2px;
}
</style>