<script setup>

  defineProps({
    basket: {
      type: Array,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    totalTax: {
      type: Number,
      required: true
    }
  })

</script>

<template>

  <tr v-if="basket.length">
    <td colspan="5">
      <div class="basket-table__summary">
        <p class="basket-table__total">Total <b>{{ totalPrice.toFixed(2) }} $</b></p>
        <p>Tax {{ totalTax.toFixed(2) }} $</p>
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
