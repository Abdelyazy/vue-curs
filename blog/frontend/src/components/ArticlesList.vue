<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCalendar, faComment } from '@fortawesome/free-solid-svg-icons';
import { useArticlesStore } from '@/stores/articles';
import { onBeforeMount } from 'vue';
import { RouterLink } from 'vue-router';
import { formatDate } from '@/utils/dateFormaters';

const articlesStore = useArticlesStore();

onBeforeMount(() => {
  articlesStore.fetchArticles();
})



</script>

<template>
  <section class="my-8">
    <h2 class="sr-only">Последние статьи</h2>
    <ul v-if="articlesStore.articles.length" class="grid grid-cols-3 gap-3">
      <li class="flex" v-for="article in articlesStore.articles" :key="article.id">
        <article class="flex w-full">
          <RouterLink :to="`/post/${article.id}`" class="bg-white w-full flex flex-col p-4 rounded-md shadow hover:shadow-md">
            <div class="mb-4">
              <img :src="article.imageUrl" class="w-full h-48 object-cover" alt="">
            </div>
            <h3 class="text-xl mb-2">{{ article.title }}</h3>
            <div class="mt-auto flex align-center justify-between">
              <p>
                <time :datetime="article.publishedAt">
                  <FontAwesomeIcon :icon="faCalendar" />
                  {{ formatDate(article.publishedAt) }}
                </time>
              </p>
              <p>
                <FontAwesomeIcon :icon="faComment" />
                {{ article.comments.length }}
                <span class="sr-only">комментариев</span>
              </p>
            </div>
          </RouterLink>
        </article>
      </li>

    </ul>
    <p v-else class="text-center text-gray-500">Нет статей для отображения</p>

  </section>
</template>


