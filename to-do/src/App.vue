<template>
  <div class="container todo-app">
    <h1 class="title">Todo List</h1>
    <TodoForm @add-todo="addTodo" />

    <TodoList :todos="todos" @remove-todo="removeTodo" @complete-todo="completeTodo" />

    <TodoFooter
      v-if="todos.length"
      :remaining="remainingTodos"
      @clear-completed="clearCompleted"
      @clear-all="clearAll"
    />
    <div v-show="isLoading">Загрузка...</div>
    <div v-show="error">Произошла ошибка: {{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
import { useFetch } from './composables/useFetch.js'

const todos = ref([])
const { isLoading, error, fetchData } = useFetch()

const fetchTodos = async () => {
  todos.value = await fetchData('/todos')
}

const addTodo = async (text) => {
  await fetchData('/todos', { method: 'POST', body: JSON.stringify({ text, completed: false }) })
  await fetchTodos()
}

const removeTodo = async (id) => {
  await fetchData(`/todos/${id}`, { method: 'DELETE' })
  await fetchTodos()
}

const completeTodo = async (id, completed) => {
  await fetchData(`/todos/${id}`, { method: 'PATCH', body: JSON.stringify({ completed }) })
  await fetchTodos()
}

const remainingTodos = computed(() =>
  todos.value.filter((todo) => !todo.completed).length
)

const clearCompleted = async () => {
  const allTodos = await fetchData('/todos')
  const completedTodos = allTodos.filter(t => t.completed)
  for (const todo of completedTodos) {
    await fetchData(`/todos/${todo.id}`, { method: 'DELETE' })
  }
  await fetchTodos()
}

const clearAll = async () => {
  const allTodos = await fetchData('/todos')
  for (const todo of allTodos) {
    await fetchData(`/todos/${todo.id}`, { method: 'DELETE' })
  }
  await fetchTodos()
}

onMounted(fetchTodos)
</script>

<style src="./App.css"></style>
