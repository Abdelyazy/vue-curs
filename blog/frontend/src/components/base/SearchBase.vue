<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
  import { ref, watch } from 'vue'

  import buttonBase from './buttonBase.vue';

  const searchQuery = ref('')

  const props = defineProps({
    search: {
      type: String,
      required: true
    },
    onSearch: {
      type: Function,
      required: true
    }
  })

  let debouncedTimer;

  const handlerSearch = () => {
    clearTimeout(debouncedTimer)
    props.onSearch({search: searchQuery.value})
  }

  const debouncedSearch = (query) => {
    clearTimeout(debouncedTimer)

    debouncedTimer = setTimeout(() => {
      props.onSearch({search: query})
    }, 2000)
  }

  watch(searchQuery, (newQuery) => {
    debouncedSearch(newQuery)
  })
</script>

<template>
  <form @submit.prevent="handlerSearch" class="mt-12 relative">
    <input type="text" name="search" v-model="searchQuery" class="border bg-white border-gray-300 w-full rounded-md p-2 pr-20" placeholder="Поиск по блогу">
    <buttonBase type="submit" class="absolute top-0 right-0 border-1 ">
      <FontAwesomeIcon :icon="faMagnifyingGlass" />
    </buttonBase>
  </form>
</template>
