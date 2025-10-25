<template>
  <div>
    <h1>Настройки</h1>
    <div class="settings-tabs">
      <RouterLink to="/settings/profile" class="settings-tab">Профиль</RouterLink>
      <RouterLink to="/settings/security" class="settings-tab">Безопасность</RouterLink>
    </div>
    <div class="settings-panel">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>

</style>
