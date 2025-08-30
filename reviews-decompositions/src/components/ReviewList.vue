<script setup>
import ReviewListItem from './ReviewListItem.vue'

defineProps({
  filteredReviews: {
    type: Array,
    required: true
  }
})
</script>

<template>
<ul class="review-tiles">
  <ReviewListItem
    v-for="review in filteredReviews"
    :key="review.id"
    :review="review"
    @toggleLike="$emit('toggleLike', review)"
    @removeReview="$emit('removeReview', review)"
  />

  <li
    v-if="filteredReviews.length === 0"
    class="reviews-tiles__item reviews-tiles__item--empty"
  >
    <p>Нет отзывов по выбранному фильтру.</p>
  </li>
</ul>
</template>

<style scoped>

.review-tiles {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  gap: 1rem;
  padding: 0;
}

</style>
