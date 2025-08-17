const TOKEN_KEY = 'auth_token';
const ROLE_KEY = 'auth_role';

export const saveToken = (token, role) => {
  localStorage.setItem(TOKEN_KEY, token);
  if (role) localStorage.setItem(ROLE_KEY, role);
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const getRole = () => {
  return localStorage.getItem(ROLE_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
};