<script setup>
import { useBasketStore } from './stores/basketStore'
import BasketTable from './components/BasketTable.vue'

const basketStore = useBasketStore()
</script>

<template>
  <BasketTable />
</template>

<style src="./App.css"></style>


