const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const getToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
const setToken = token => localStorage.setItem(ACCESS_TOKEN_KEY, token);
const removeToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);

const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);
const setRefreshToken = token => localStorage.setItem(REFRESH_TOKEN_KEY, token);
const removeRefreshToken = () => localStorage.removeItem(REFRESH_TOKEN_KEY);

const isTokenExpired = token => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch {
    return true;
  }
};

export { getToken, setToken, removeToken, getRefreshToken, setRefreshToken, removeRefreshToken, isTokenExpired };
