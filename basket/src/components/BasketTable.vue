<script setup>
  import { useBasketStore } from '../stores/basketStore'
  import BasketTableItem from './BasketTableItem.vue'
  import BasketTableSummary from './BasketTableSummary.vue'

  const basketStore = useBasketStore()
</script>

<template>
  <div class="container basket">
    <table class="basket-table">
      <thead class="basket-table__header">
        <tr>
          <th>Product Details</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody class="basket-table__body">

        <BasketTableItem
          v-for="(item, index) in basketStore.basket"
          :key="item.id"
          :basketItem="item"
          :index="index"
        />

        <tr v-if="!basketStore.basket.length">
          <td colspan="5">
            <p class="basket-table__empty">No items</p>
          </td>
        </tr>

        <BasketTableSummary />
      </tbody>
    </table>
  </div>

</template>


<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
}

.basket-table__empty {
  text-align: center;
  color: #a7a7a7;
}
</style>
