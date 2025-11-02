<script setup>
  import { useBasketStore } from '../stores/basketStore'

  const basketStore = useBasketStore()
</script>

<template>

  <tr v-if="basketStore.basket.length">
    <td colspan="5">
      <div class="basket-table__summary">
        <p class="basket-table__total">Total <b>{{ basketStore.totalPrice.toFixed(2) }} $</b></p>
        <p>Tax {{ basketStore.totalTax.toFixed(2) }} $</p>
      </div>
    </td>
  </tr>

</template>

<style scoped>
.basket-table__summary {
  text-align: right;
}

.basket-table__total {
  font-size: 1.4rem;
}
</style>
