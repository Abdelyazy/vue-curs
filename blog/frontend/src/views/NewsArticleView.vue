<script setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue';
import LabelBase from '@/components/base/LabelBase.vue';
import InputBase from '@/components/base/InputBase.vue';
import InputErrorBase from '@/components/base/InputErrorBase.vue';
import buttonBase from '@/components/base/buttonBase.vue';
import MassegeBox from '@/components/base/MassegeBox.vue';

import { ref } from 'vue';
import { Form } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import { useArticleStore } from '@/stores/article';

const router = useRouter();
const articleStore = useArticleStore();

const schema = yup.object({
  imageUrl: yup.string().required('URL изображения обязательно').url('Введите корректную ссылку'),
  title: yup.string().required('Заголовок обязательно'),
  content: yup.string().required('Содержимое обязательно'),
});

const errorMessage = ref('');

const handleAddArticle = async (formData) => {
  errorMessage.value = '';
  const response = await articleStore.addaArticle(formData);

  if (response.error) {
    errorMessage.value = response.error;
  }else {
    router.push(`/post/${response.data.id}`);
  }
}
</script>

<template>
  <LayoutContainer class="py-8">
    <h1 class="text-2xl font-bold text-center mb-4">Новая статья</h1>
    <Form class="bg-white w-full mx-auto p-6 rounded-md shadow-md" :validation-schema="schema" @submit="handleAddArticle">
      <div class="mb-4">
        <LabelBase for="imageUrl">URL изображения</LabelBase>
        <InputBase type="url" name="imageUrl" id="imageUrl"  />
        <InputErrorBase name="imageUrl" />
      </div>
      <div class="mb-4">
        <LabelBase for="title">Заголовок</LabelBase>
        <InputBase type="url" name="title" id="title"  />
        <InputErrorBase name="title" />
      </div>
      <div class="mb-4">
        <LabelBase for="title">Содержимое</LabelBase>
        <InputBase as="textarea" name="content" id="content" rows="15"  />
        <InputErrorBase name="content" />
      </div>
      <div class="flex justify-between items-center">
        <MassegeBox v-if="errorMessage" type="error">{{ errorMessage }}</MassegeBox>
        <buttonBase  type="submit" class="ml-auto" >Сохранить</buttonBase>
      </div>
    </Form>
  </LayoutContainer>
</template>
