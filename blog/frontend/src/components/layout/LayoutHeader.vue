<script setup>
  import LayoutContainer from './LayoutContainer.vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faCode, faBackward, faFile, faUsers, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
  import { RouterLink } from 'vue-router';
  import { useUserStore } from '@/stores/user';
  import { useRoute, useRouter } from 'vue-router';

  const userStore = useUserStore();
  const route = useRoute();
  const router = useRouter();

  const handleLogout = async () => {
    const response = await userStore.logout();

    if (!response.error && route.meta.requiresAuth) {
      router.push('/');
    }
  }
</script>

<template>
    <LayoutContainer>
      <div class="flex items-center justify-between py-4">
        <div>
          <RouterLink to="/" class="hover:text-blue-500 flex items-center">
            <FontAwesomeIcon :icon="faCode" class="mr-2" />
            Блог веб-разработчика
          </RouterLink>
        </div>
        <div>
          <p>Веб-технологии</p>
          <p>Написание кода</p>
          <p>Разбор ошибок</p>
        </div>
        <div>
          <div class="mb-3">
            <RouterLink v-if="!userStore.isAuthorized"  to="/login" class="bg-blue-500 px-4 py-2 text-white rounded-md hover:bg-blue-700">Войти</RouterLink>
            <div class="text-right" v-else>
              <span>{{ userStore.user.login }}</span>
              &nbsp;|&nbsp;
              <button class="cursor-pointer hover:text-blue-500 " @click="handleLogout">
                <FontAwesomeIcon :icon="faArrowRightFromBracket" />
              </button>
            </div>
          </div>
          <p>
            <a aria-label="Назад" href="#" @click="$router.go(-1)"><FontAwesomeIcon :icon="faBackward" class="hover:text-blue-500" /></a>&nbsp;
            <RouterLink v-if="userStore.isAuthorized && userStore.isAdmin" aria-label="Новая статья" to="/post"><FontAwesomeIcon :icon="faFile" class="hover:text-blue-500" /></RouterLink>&nbsp;
            <RouterLink v-if="userStore.isAuthorized && userStore.isAdmin" aria-label="Пользователи" to="/users"><FontAwesomeIcon :icon="faUsers" class="hover:text-blue-500" /></RouterLink>
          </p>
        </div>
      </div>

    </LayoutContainer>
</template>
