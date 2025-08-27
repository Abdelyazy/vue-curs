<script setup>
import {ref } from 'vue'

const count = ref(0)


function increaseCount(event) {

  
  count.value++
}

</script>

<template>

  <button @click="increaseCount">Увеличить на 1</button>
  <p>Счетсчик: {{ count }}</p>
</template>

<style src="./App.css"></style>
