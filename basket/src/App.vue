<script setup>
import { reactive, computed, onMounted } from 'vue'
import BasketTable from './components/BasketTable.vue'

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
  <BasketTable
  :basket="basket"
  :totalPrice="totalPrice"
  :totalTax="totalTax"
  @increaseItemQuantity="increaseItemQuantity"
  @decreaseItemQuantity="decreaseItemQuantity"
  @removeItem="removeItem"
  />
</template>

<style src="./App.css"></style>


