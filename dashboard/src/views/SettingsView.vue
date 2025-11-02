<template>
  <div>
    <h1>Настройки</h1>
    <div class="settings-tabs">
      <RouterLink class="settings-tab" to="/settings/profile">Профиль</RouterLink>
      <RouterLink class="settings-tab" to="/settings/security">Безопасность</RouterLink>
    </div>

    <div class="settings-panel">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <Component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<style>
.settings-tabs {
  display: flex;
  border-bottom: 1px solid #929292;
  margin-bottom: 20px;
}

.settings-tab {
  background-color: #f0f0f0;
  color: #333;
  padding: 8px 12px;
  border-radius: 4px 4px 0 0;
  text-decoration: none;
  margin-right: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.settings-tab.router-link--active {
  background-color: #929292;
  color: white;
}

.settings-tab:hover {
  text-decoration: none;
  background-color: #929292;
  color: white;
}

.settings-panel {
  margin: 30px 0;
}
</style>
