<script setup>
import { ref, onMounted } from 'vue'
import { logout } from './auth/index.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const loggedIn = ref(false)

const checkAuth = () => {
  loggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
}

onMounted(() => {
  checkAuth()
})

const handleLogout = () => {
  logout()
  loggedIn.value = false
  router.push('/login')
}
</script>

<template>
  <div id="app">
    <div class="wrapper">
      <nav class="navigation">
        <div class="navigation-left">
          <RouterLink v-if="loggedIn" to="/">Dashboard</RouterLink>
          <RouterLink v-if="loggedIn" to="/tasks">Tasks</RouterLink>
          <RouterLink v-if="loggedIn" to="/settings">Settings</RouterLink>
        </div>
        <div class="navigation-right" v-if="loggedIn">
          <button class="btn-logout" @click="handleLogout">Logout</button>
        </div>
        <div class="navigation-right" v-else>
          <RouterLink to="/login" class="btn-login">Login</RouterLink>
        </div>
      </nav>
      <main class="container">
        <transition name="fade">
          <RouterView @login="checkAuth" />
        </transition>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Only component-specific styles remain here if needed */
</style>
