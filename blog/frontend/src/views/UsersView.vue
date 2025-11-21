<script setup>
import { onBeforeMount, ref } from 'vue';
import LayoutContainer from '@/components/layout/LayoutContainer.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '@/utils/dateFormaters';

import { useUsersStore } from '@/stores/users';
import { useRolesStore } from '@/stores/roles';

import MassegeBox from '@/components/base/MassegeBox.vue';
import InputBase from '@/components/base/InputBase.vue';


const users = ref([]);
const userMassage = ref({});
const userMassageType = ref({});

const usersStore = useUsersStore();
const rolesStore = useRolesStore();

const errorMassage = ref('');
const originalRoles = ref({});

onBeforeMount(async () => {
  Promise.all([
    rolesStore.fetchRoles(),
    usersStore.fetchUsers()
  ]).then(([rolesResponse, usersResponse]) => {

    if (rolesResponse.error || usersResponse.error) {
      console.error(rolesResponse.error || usersResponse.error);
      errorMassage.value = 'Ошибка загрузки данных';
    } else {
      rolesStore.roles = rolesResponse.data;
      usersStore.users = JSON.parse(JSON.stringify(usersResponse.data));
      users.value = JSON.parse(JSON.stringify(usersResponse.data));

      // Сохраняем оригинальные роли для сравнения
      originalRoles.value = {};
      usersResponse.data.forEach(user => {
        originalRoles.value[user.id] = user.roleId;
      });
    }
  })
})

const handleUserDelete = async (userId) => {
  const response = await usersStore.deleteUser(userId);

  if (response.error) {
    console.error(response.error);
    errorMassage.value = response.error;
  } else {
    usersStore.users = usersStore.users.filter(user => user.id !== userId);
    users.value = users.value.filter(user => user.id !== userId);
  }
}



const handleUserRole = async (user) => {
  const originalRoleId = originalRoles.value[user.id];

  if (user.roleId === originalRoleId) {
    return;
  }

  const response = await usersStore.changeUserRole(user.id, user.roleId);

  if (!response || !response.data) {
    console.error('Ошибка обновления роли');
    errorMassage.value = 'Ошибка обновления роли';
    user.roleId = originalRoleId;
  } else {
    userMassage.value[user.id] = 'Обновлено';
    userMassageType.value[user.id] = 'success';
    console.log('Роль пользователя обновлена');
    originalRoles.value[user.id] = response.data.roleId;
    const userInStore = usersStore.users.find(u => u.id === user.id);
    userInStore.roleId = response.data.roleId;
    user.roleId = response.data.roleId;

    setTimeout(() => {
      userMassage.value[user.id] = '';
      userMassageType.value[user.id] = '';
    }, 3000);
  }
}



</script>

<template>
  <LayoutContainer>
    <h1 class="text-3xl font-bold text-center my-10">Пользователи</h1>


    <div class="bg-white rounded-md shadow-md p-8 mb-10">

      <MassegeBox v-if="errorMassage" type="error" >{{ errorMassage }}</MassegeBox>

      <table v-if="users.length > 0" class="min-w-full table-fixed">
        <thead>
          <tr>
            <th class="p-2">Логин</th>
            <th class="p-2">Дата регистрации</th>
            <th class="p-2">Роль</th>
            <th class="p-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in usersStore.users" :key="user.id">
            <td class="p-2 text-center">{{ user.login }}</td>
            <td class="p-2 text-center">{{ formatDate(user.registeredAt, {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric'
            }) }}</td>
            <td class="p-2">
              <form  class="flex gap-2 relative" @submit.prevent="handleUserRole(user)">
                <InputBase as="select" :name="`user-${user.id}-role`" v-model.number="user.roleId" :key="user.id">
                  <option v-for="role in rolesStore.roles" :key="`${user.id}-${role.id}`" :value="role.id">{{ role.name }}</option>
                </InputBase>
                <button type="submit" class="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2 px-3" >
                  <FontAwesomeIcon :icon="faFloppyDisk" />
                </button>

                <MassegeBox class="absolute left-full ml-2" v-if="userMassage[user.id]" :type="userMassageType[user.id]" >{{ userMassage[user.id] }}</MassegeBox>
              </form>
            </td>
            <td class="p-2 text-right">
              <button class="text-red-500 hover:text-red-700 cursor-pointer" @click="handleUserDelete(user.id)">
                <FontAwesomeIcon :icon="faTrash" />
                &nbsp;
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </LayoutContainer>
</template>
