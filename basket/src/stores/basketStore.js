import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const defaultBasket = [
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

export const useBasketStore = defineStore('basket', () => {
  // Функция для загрузки корзины из localStorage
  const loadBasketFromStorage = () => {
    const savedBasket = localStorage.getItem('basket')
    return savedBasket ? JSON.parse(savedBasket) : defaultBasket
  }

  // Функция для сохранения корзины в localStorage
  const saveBasketToStorage = (basket) => {
    localStorage.setItem('basket', JSON.stringify(basket))
  }

  // Реактивное состояние корзины
  const basket = ref(loadBasketFromStorage())

  // Вычисляемое свойство для итоговой стоимости
  const totalPrice = computed(() => {
    return basket.value.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  })

  // Вычисляемое свойство для налога (10% от итоговой стоимости)
  const totalTax = computed(() => {
    return Math.round(totalPrice.value * 0.1 * 100) / 100
  })

  // Функции для увеличения количества
  const increaseItemQuantity = (index) => {
    basket.value[index].quantity++
    saveBasketToStorage(basket.value)
  }

  // Функции для уменьшения количества
  const decreaseItemQuantity = (index) => {
    if (basket.value[index].quantity > 1) {
      basket.value[index].quantity--
      saveBasketToStorage(basket.value)
    }
  }

  // Функции для удаления товара
  const removeItem = (index) => {
    basket.value.splice(index, 1)
    saveBasketToStorage(basket.value)
  }

  return {
    basket,
    totalPrice,
    totalTax,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
  }
})
