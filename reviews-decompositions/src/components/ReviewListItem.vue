<script setup>
  defineProps({
    review: {
      type: Object,
      required: true
    }
  })
</script>


<template>
  <li  v-if="review" :key="review.id" class="review-tiles__item">
    <div class="review">
      <div class="review__header">
        <p class="review__author">{{ review.author }}</p>
        <div class="review__rating">
          <span v-for="n in 5" :key="`star-${n}`" class="star">
            {{ n <= review.rating ? '★' : '☆' }}
          </span>
        </div>
      </div>
      <p class="review__text">"{{ review.text }}"</p>
      <div class="review__actions">
        <button @click="$emit('toggleLike')" class="btn btn--like">
          {{ review.liked ? '❤️' : '🤍' }}
        </button>
        <button @click="$emit('removeReview')" class="btn btn--delete">Удалить</button>
      </div>
    </div>
  </li>

</template>

<style scoped>

.reviews__title {
  text-align: center;
  margin-bottom: 1rem;
}

.btn {
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.btn--filter {
  padding: 6px 12px;
  background: #eee;
  border-radius: 4px;
}

.review-tiles__item {
  flex-basis: calc(100% / 3 - 5rem);
  border: 1px solid #bebcbd;
  border-radius: 10px;
  padding: 1rem 2rem;
}

.reviews-tiles__item--empty {
  text-align: center;
  padding: 1rem;
  font-style: italic;
  color: #777;
}

@media screen and (max-width: 850px) {
  .review-tiles__item {
    flex-basis: calc(100% - 2rem);
  }
}

.review__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
}

.review__text {
  color: #807d7e;
  margin-bottom: 1.5rem;
}

.review__author {
  font-weight: bold;
  margin-bottom: 0.3rem;
}

.review__rating {
  color: gold;
  font-size: 1.2rem;
}

.review__actions {
  display: flex;
  gap: 10px;
}

.btn--like,
.btn--delete {
  padding: 4px 10px;
}

.btn--like {
  background: #f9f9f9;
}

.btn--delete {
  background: #ffdddd;
}
</style>
