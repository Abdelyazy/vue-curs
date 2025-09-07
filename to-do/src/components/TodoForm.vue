<script setup>
  const emit = defineEmits(['add-todo'])
  const text = defineModel()

  const handleAdd = () => {
    if (text.value?.trim()) {
      emit('add-todo', text.value.trim())
      text.value = ''
    }
  }
</script>

<template>
  <form class="form" @submit.prevent="handleAdd">
    <div class="form__group form__group--todo">
      <input class="form-control" type="text" v-model="text" placeholder="Новая задача"/>
      <button class="btn btn--add-todo" @click="handleAdd" type="submit">Добавить</button>
    </div>
  </form>
</template>

<style scoped>
  .form {
  display: block;
  margin-bottom: 2rem;
}

.form__group {
  display: flex;
  width: 100%;
}

.form-control {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
}

.form-control:focus {
  outline: none;
  border-color: #6574cd;
}

.btn--add-todo {
  border-radius: 0 5px 5px 0;
}
</style>
