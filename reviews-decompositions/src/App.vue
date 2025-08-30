<script setup>
import { reactive, computed } from 'vue'
import FilterPanel from './components/FilterPanel.vue'
import ReviewList from './components/ReviewList.vue'

// Отзывы с рейтингом
const reviews = reactive([
  { id: 1, author: 'Иван Иванов', text: 'Отличный сервис!', liked: true, rating: 5 },
  { id: 2, author: 'Мария Смирнова', text: 'Довольна качеством товара.', liked: false, rating: 4 },
  { id: 3, author: 'Дмитрий Кузнецов', text: 'Быстрая доставка.', liked: true, rating: 3 },
  { id: 4, author: 'Аноним', text: 'Такое себе', liked: false, rating: 2 },
])

const filterOptions = reactive([
  { value: 'all', label: 'Все', active: true },
  { value: 'liked', label: '❤️ Понравившиеся', active: false },
  { value: 'notLiked', label: '👎 Без лайка', active: false },
  { value: 'highRating', label: '⭐ 4 и выше', active: false },
])

const filter = computed(() => {
  return filterOptions.find((f) => f.active).value
})

const filteredReviews = computed(() => {
  if (filter.value === 'liked') return reviews.filter((r) => r.liked)
  if (filter.value === 'notLiked') return reviews.filter((r) => !r.liked)
  if (filter.value === 'highRating') return reviews.filter((r) => r.rating >= 4)
  return reviews
})

const toggleLike = (review) => {
  review.liked = !review.liked
}

const removeReview = (index) => {
  reviews.splice(index, 1)
}

const setFilter = (value) => {
  filterOptions.forEach((f) => {
    f.active = f.value === value
  })
}


</script>

<template>
  <div class="container reviews">
    <h1 class="reviews__title">Отзывы</h1>

    <!-- Панель фильтров -->
    <FilterPanel :filterOptions="filterOptions" @setFilter="setFilter" />

    <!-- Список отзывов -->
    <ReviewList :filteredReviews="filteredReviews" @toggleLike="toggleLike" @removeReview="removeReview"/>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: sans-serif;
}

.reviews__title {
  text-align: center;
  margin-bottom: 1rem;
}


</style>
