<script setup>
import { reactive, computed, onMounted } from 'vue'

// Функция для загрузки корзины из localStorage
const loadBasketFromStorage = () => {
  const savedBasket = localStorage.getItem('basket')
  return savedBasket ? JSON.parse(savedBasket) : [
    {
      id: 1,
      name: 'Blue Flower Print Crop Top',
      color: 'Yellow',
      size: 'M',
      price: 29.0,
      quantity: 1,
      imageUrl: './assets/crop-top.png',
    },
    {
      id: 2,
      name: 'Levender Hoodie',
      color: 'Levender',
      size: 'XXL',
      price: 119.0,
      quantity: 1,
      imageUrl: './assets/hoodie.png',
    },
    {
      id: 3,
      name: 'Black Sweatshirt',
      color: 'Black',
      size: 'XXL',
      price: 123.0,
      quantity: 1,
      imageUrl: './assets/sweatshirt.png',
    },
  ]
}

// Функция для сохранения корзины в localStorage
const saveBasketToStorage = (basket) => {
  localStorage.setItem('basket', JSON.stringify(basket))
}

const basket = reactive(loadBasketFromStorage())

// Сохраняем корзину при любом изменении
const updateBasket = (callback) => {
  callback()
  saveBasketToStorage(basket)
}

// Вычисляемое свойство для итоговой стоимости
const totalPrice = computed(() => {
  return basket.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
})

// Вычисляемое свойство для налога (10% от итоговой стоимости)
const totalTax = computed(() => {
  return Math.round(totalPrice.value * 0.1 * 100) / 100
})

// Функции для увеличения
const increaseItemQuantity = (index) => {
  updateBasket(() => {
    basket[index].quantity++
  })
}

// Функции для уменьшения
const decreaseItemQuantity = (index) => {
  updateBasket(() => {
    if (basket[index].quantity > 1) {
      basket[index].quantity--
    }
  })
}

// Функции для удаления
const removeItem = (index) => {
  updateBasket(() => {
    basket.splice(index, 1)
  })
}

// Загружаем корзину из localStorage при монтировании компонента
onMounted(() => {
  const savedBasket = loadBasketFromStorage()
  basket.splice(0, basket.length, ...savedBasket)
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
          <tr v-for="(basketItem, index) in basket" :key="basketItem.id">
            <td>
              <div class="basket-item">
                <div class="basket-item__image">
                  <img :src="basketItem.imageUrl" alt="" />
                </div>
                <div class="basket-item__info">
                  <h2 class="basket-item__info-h2">{{ basketItem.name }}</h2>
                  <p class="basket-item__info-p">{{ basketItem.color }}</p>
                  <p class="basket-item__info-p"> {{ basketItem.size }}</p>
                </div>
              </div>
            </td>
            <td>
              <p class="basket-item__price">{{ basketItem.price }} $</p>
            </td>
            <td>
              <div class="basket-item__quantity">
                <button @click="decreaseItemQuantity(index)" class="quantity-button">–</button>
                <input type="number" :value="basketItem.quantity" min="1" readonly />
                <button @click="increaseItemQuantity(index)" class="quantity-button">+</button>
              </div>
            </td>
            <td>
              <p class="basket-item__price">{{ (basketItem.price * basketItem.quantity).toFixed(2) }} $</p>
            </td>
            <td>
              <button @click="removeItem(index)" class="btn btn-delete" aria-label="Удалить">
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                  />
                </svg>
              </button>
            </td>
          </tr>

          <tr v-if="!basket.length">
            <td colspan="5">
              <p class="basket-table__empty">No items</p>
            </td>
          </tr>

          <tr v-if="basket.length">
            <td colspan="5">
              <div class="basket-table__summary">
                <p class="basket-table__total">Total <b>{{ totalPrice.toFixed(2) }} $</b></p>
                <p>Tax {{ totalTax.toFixed(2) }} $</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<style src="./App.css"></style>


