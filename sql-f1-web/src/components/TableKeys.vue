<script setup>
const { points } = defineProps(['points'])

</script>

<template>
    <table id='key'>
        <td id='p1'> Winner </td>
        <td id='p2'> Second </td>
        <td id='p3'> Third </td>
        <td id='pF'> Points Finish </td>
        <td id='pE'> Race Entry w/o Points </td>
        <td id='pN'> Not entered </td>
        <td id='bF'> Fastest Race Lap </td>
        <td id='bP'> Pole Position </td>
        <td id='bB'> Both Pole and Fastest Lap </td>
    </table>
</template>

<style>
#key {
    border: none;
    background-color: transparent;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    display: grid;
    grid-gap: 4px;
    grid-template-columns: repeat(9, auto)
}
#key td {
    text-align: center;
    border: 1px black solid;
}
#key #p1 {
    background-color: rgb(200,200,100);
}
#key #p2 {
    background-color: rgb(150,150,150);
}
#key #p3 {
    background-color: rgb(205, 127, 50);
}
#key #pF {
    background-color: rgb(150,150,255);
}
#key #pE {
    background-color: rgb(180,180,180);
}
#key #pN {
    background-color: white;
}
#key #bF {
    border: 2px purple solid;
}
#key #bP {
    border: 2px blue solid;
}
#key #bB {
    border: 2px green solid;
}
</style>