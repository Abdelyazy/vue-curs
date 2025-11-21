<script setup>
import { useModalStore } from '@/stores/modal';
import buttonBase from './buttonBase.vue';

const modalStore = useModalStore();
</script>

<template>
  <div v-show="modalStore.isVisible" class="fixed left-0 top-0 right-0 bottom-0 z-50">
    <div class="fixed left-0 top-0 right-0 bottom-0 bg-black opacity-30" @click="modalStore.close"></div>

    <div class="bg-white rounded-md p-8 top-50 relative w-lg mx-auto">
      <p class="text-center mt-4 mb-8">{{ modalStore.message }}</p>

      <div class="flex gap-4 justify-end">
        <buttonBase type="button" variant="secondary" @click="modalStore.close">Отмена</buttonBase>
        <buttonBase type="button"   @click="modalStore.confirm">Да</buttonBase>
      </div>

    </div>
  </div>
</template>
