<script setup>
import buttonBase from '@/components/base/buttonBase.vue';
import { useArticleStore } from '@/stores/article';
import { ref } from 'vue';
import LabelBase from './base/LabelBase.vue';
import InputBase from './base/InputBase.vue';

const articleStore = useArticleStore();

const newComment = ref('');
const errorMessage = ref('');

const handlecommentSubmit = async () => {
  errorMessage.value = '';

  if (!newComment.value.trim()) {
    errorMessage.value = 'Комментарий не может быть пустым';
    return;
  }

  const response = await articleStore.addComment(newComment.value);
  if (response.error) {
    errorMessage.value = response.error;
  } else {
    newComment.value = '';
  }
}

</script>


<template>
  <form class="bg-white rounded-md shadow-md p-4 mb-8" @submit.prevent="handlecommentSubmit">
    <LabelBase for="newComment" >Ваш комментарий</LabelBase>
    <InputBase name="newComment" as="textarea" v-model="newComment" id="newComment"></InputBase>
    <div class="flex justify-between">
      <p class="text-red-500" v-if="errorMessage">{{ errorMessage }}</p>
      <buttonBase type="submit" class="w-xs ml-auto">Отправить</buttonBase>
    </div>
  </form>
</template>
