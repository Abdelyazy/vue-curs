<script setup>
  import BasketTableItem from './BasketTableItem.vue'
  import BasketTableSummary from './BasketTableSummary.vue'

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
          v-for="(item, index) in basket"
          :key="item.id"
          :basketItem="item"
          :index="index"
          @increaseItemQuantity="$emit('increaseItemQuantity', index)"
          @decreaseItemQuantity="$emit('decreaseItemQuantity', index)"
          @removeItem="$emit('removeItem', index)"
        />

        <tr v-if="!basket.length">
          <td colspan="5">
            <p class="basket-table__empty">No items</p>
          </td>
        </tr>

        <BasketTableSummary
          :basket="basket"
          :totalPrice="totalPrice"
          :totalTax="totalTax"
        />
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
