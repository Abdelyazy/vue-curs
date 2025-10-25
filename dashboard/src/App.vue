<script setup>

</script>

<template>
  <div id="app">
    <div class="wrapper">
      <nav class="navigation">
        <div class="navigation-left">
          <RouterLink to="/">Dashboard</RouterLink>
          <RouterLink to="/tasks">Tasks</RouterLink>
          <RouterLink to="/settings">Settings</RouterLink>
        </div>
      </nav>
      <main class="container">
        <transition name="fade">
          <RouterView />
        </transition>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Only component-specific styles remain here if needed */
</style>
