<script setup>
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasks'

const newTitle = ref('')
const newDescription = ref('')

const tasksStore = useTasksStore()

const addTask = () => {
  if(newTitle.value && newDescription.value) {
    tasksStore.addTask(newTitle.value, newDescription.value);
    newTitle.value = '';
    newDescription.value = '';
  }
}

</script>

<template>
<form class="form" @submit.prevent="addTask">
  <h3 class="form__title">Добавить новую задачу</h3>
  <input class="form-control" type="text" v-model.trim="newTitle" placeholder="Новая задача" />
  <textarea class="form-control" name="description" v-model.trim="newDescription" placeholder="Описание задачи"></textarea>
  <button class="btn btn--add-task" type="submit">Добавить</button>
</form>

</template>


<style scoped>
.form {
  display: block;
}

.form__title {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.form-control {
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
}

.btn--add-task {
  flex-direction: column;
  gap: 12px;
}

.form-control {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn--add-task {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.btn--add-task:hover {
  background-color: #218838;
}
</style>
