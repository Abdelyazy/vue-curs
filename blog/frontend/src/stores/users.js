import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const users = ref([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');

      if (!response.ok) {
        throw new Error('Ошибка запроса данных пользователей');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка получения пользователей:', error);
    }
  }

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Ошибка удаления пользователя');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка удаления пользователя:', error);
    }
  }

  const changeUserRole = async (userId, userRole) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ roleId: userRole })
      });

      if (!response.ok) {
        throw new Error('Ошибка изменения роли пользователя');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка изменения роли пользователя:', error);
      return { error: error.message };
    }
  }

  return { users, fetchUsers, changeUserRole, updateUserRole: changeUserRole, deleteUser }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot))
}
