<script setup>
import { useRouter } from 'vue-router'
import { login } from '../auth/index.js'

const router = useRouter()
const emit = defineEmits(['login'])

const handleLogin = () => {
  login('user', 'pass') // Простая авторизация без проверки
  emit('login') // Emit event to parent
  router.push('/')
}
</script>

<template>
  <div class="login">
    <h1>Вход</h1>
    <button @click="handleLogin" class="btn-login">Войти как пользователь</button>
    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>

<style scoped>
.login form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: 0 auto;
}

.login label {
  font-weight: bold;
}

.login input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
