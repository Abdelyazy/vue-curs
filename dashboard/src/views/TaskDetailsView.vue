<script setup>
import { useTasksStore } from '@/stores/tasks';
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const tasksStore = useTasksStore()
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const task = tasksStore.tasks.find(task => task.id === parseInt(props.id))
const router = useRouter()

if (!task) {
  router.replace('/404')
}

const deleteTask = () => {
  tasksStore.deleteTask(task.id);
  router.push('/tasks')
}

const isEditing = ref(false)
const newTitle = ref(task.title)
const newDescription = ref(task.description)

const saveTask = () => {
  if(newTitle.value && newDescription.value) {
    tasksStore.updateTask(task.id, newTitle.value, newDescription.value)
    isEditing.value = false;
  }
}

</script>

<template>
  <div>
    <div v-if="task">
      <form v-if="isEditing" @submit.prevent="saveTask">
        <input class="form-control" name="title" type="text" v-model="newTitle" placeholder="Новая задача" />
        <textarea class="form-control" name="desc" v-model="newDescription" placeholder="Описание задачи"></textarea>
        <button class="btn btn--edit" type="button" @click="isEditing = false">Отмена</button>
        &nbsp;
        <button class="btn btn--edit" type="submit">Сохранить</button>
      </form>
      <div v-else>
        <h1>{{ task.title }}</h1>
        <p>{{ task.description }}</p>
        <button class="btn btn--edit" @click="isEditing = true">Редактировать</button>
        &nbsp;
        <button class="btn btn--delete" @click="deleteTask">Удалить</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn--edit {
  background-color: #007bff;
  color: white;
}

.btn--edit:hover {
  background-color: #0056b3;
}

.btn--delete {
  background-color: #dc3545;
  color: white;
}

.btn--delete:hover {
  background-color: #c82333;
}

.btn--save {
  background-color: #28a745;
  color: white;
}

.btn--save:hover {
  background-color: #218838;
}
</style>
