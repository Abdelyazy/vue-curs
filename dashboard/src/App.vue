<template>
  <div class="wrapper">
    <nav class="navigation">
      <div class="navigation-left">
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/tasks">Tasks</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
      </div>
    </nav>
    <main class="container">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <Component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>


<style>
body {
  font-family: sans-serif;
  margin: 0;
  background-color: #f6f7f9;
  color: #333;
}

.wrapper {
  max-width: 800px;
  margin: 0 auto;
  top: 20vh;
  position: relative;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 30px;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e1e2f;
  border-radius: 8px 8px 0 0;
  padding: 12px 20px;
  color: white;
  line-height: 1.75;
}

.navigation-left,
.navigation-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.navigation a {
  color: #f9f9f9;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s ease;
}

.navigation a.router-link--intermediate,
.navigation a.router-link--active {
  opacity: 1;
  color: #ffffff;
  font-weight: bold;
}

.navigation a:hover {
  opacity: 0.8;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
