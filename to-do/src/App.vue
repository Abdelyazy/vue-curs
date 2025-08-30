<script setup>
  import { reactive, computed } from 'vue'
  import TodoListitem from './components/TodoListitem.vue'

  const todos = reactive([
    {
      id: 1,
      text: 'Изучить компоненты Vue.js',
      completed: true
    },
    {
      id: 2,
      text: 'Создать TodoList приложение',
      completed: false
    },
    {
      id: 3,
      text: 'Похвалить себя за отличную работу',
      completed: false
    }
  ])

  const removeTodo = (index) => {
    todos.splice(index, 1)
  }

  const remainTodos = computed(() => {
    return todos.filter((todo) => !todo.completed).length
  })

  const clearCompleted = () => {
    todos.filter((todo) => todo.completed).forEach((todo) => {
      removeTodo(todos.indexOf(todo))
    })
  }

  const clearAll = () => {
    todos.splice(0, todos.length)
  }

</script>

<template>
  <div class="container todo-app">
    <h1 class="title">Todo List</h1>
    <div class="todo-app__main">
      <ul class="todo-list">
        <li class="todo-list__item"  v-for="(todo, index) in todos" :key="todo.id" :class="{ 'todo-list__item--completed': todo.completed }">
          <TodoListitem
            v-bind="todo" @complete-todo.once="() => (todo.completed = !todo.completed)"
            @remove-todo="removeTodo(index)"
          />
        </li>
      </ul>
      <div v-if="!todos.length" class="todo-list__empty">
        <p>Список задач пуст</p>
      </div>
    </div>

    <div class="todo-app__footer" v-if="todos.length">
      <p class="todo-app__footer-text">Осталось {{ remainTodos }} задания(й)</p>
      <button @click="clearCompleted" class="btn btn--clear">Удалить завершенные</button>
      <button @click="clearAll" class="btn btn--clear">Очистить список</button>
    </div>
  </div>
</template>

<style src="./app.css"></style>
