<script setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue';
import ArticleDetails from '@/components/ArticleDetails.vue';
import ArticleDetailsForm from '@/components/ArticleDetailsForm.vue';
import CommentsList from '@/components/CommentsList.vue';
import CommentsForm from '@/components/CommentsForm.vue';
import { onBeforeMount } from 'vue';
import NotFoundView from './NotFoundView.vue';
import { ref } from 'vue';


import { useUserStore } from '@/stores/user';
import { useArticleStore } from '@/stores/article';

const userStore = useUserStore();
const articleStore = useArticleStore();
const notFound = ref(false);

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const formatDataOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
}

onBeforeMount (async() => {
  try {
    const response = await articleStore.fetchArticle(props.id)
    if (response.error) {
      notFound.value = true
    } else {
      notFound.value = false
    }
  } catch (error) {
    console.error(error);
    notFound.value = true
  }

})
</script>


<template>
  <NotFoundView v-if="notFound" />
  <LayoutContainer v-else class="mt-4">
    <ArticleDetailsForm v-if="articleStore.isInEditMode" />
    <ArticleDetails v-else :date-options="formatDataOptions" />
    <div v-if="!articleStore.isInEditMode && ((articleStore.article.comments && articleStore.article.comments.length > 0) || userStore.isAuthorized)">
      <h2 class="text-2xl font-bold mb-4">Комментарии</h2>
      <CommentsList :date-options="formatDataOptions" />
      <CommentsForm v-if="userStore.isAuthorized" />
    </div>
  </LayoutContainer>
</template>
