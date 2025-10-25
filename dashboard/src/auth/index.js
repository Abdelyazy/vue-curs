// Управление состоянием авторизации

const AUTH_KEY = 'isLoggedIn';

export const isLoggedIn = () => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};

export const login = (username, password) => {
  // Простая проверка для демонстрации
  // В реальном приложении здесь будет запрос к API
  if (username && password) {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};
