<script setup>
import Heading from './components/Heading.vue';
import MainScreen from './components/MainScreen.vue';
</script>

<template>
  <header>
      <Heading />
  </header>

  <main>
    <MainScreen />
  </main>
</template>

<style scoped>
header {
  height: 110px;
  background-color: rgb(0,0,0);
  display: flex;
  align-items: end;
  color: white;
}

main {
  background-color: rgb(5,100,100);
  min-height: 300px;
  padding: 20px;
}
</style>
