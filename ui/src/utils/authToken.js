import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';

export const saveToken = (token) => {
  Cookies.set(TOKEN_KEY, token, {
    expires: 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
};

export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};