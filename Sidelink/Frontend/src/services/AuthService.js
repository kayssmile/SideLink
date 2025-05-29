import { axiosInstanceBasicAuth } from 'src/api/AxiosInstance';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

async function checkAuth() {
  let accessToken = getToken();
  let refreshToken = getRefreshToken();

  if (!accessToken) {
    return false;
  }

  if (isTokenExpired(accessToken)) {
    if (refreshToken && !isTokenExpired(refreshToken)) {
      try {
        console.log('Token expired, refreshing...');

        const newAccessToken = await refreshAccessToken(refreshToken);

        return true;
      } catch (error) {
        console.log('Error refreshing token:', error);
        if (getToken()) {
          removeToken();
        }
        return false;
      }
    } else {
      if (getRefreshToken()) {
        removeRefreshToken();
      }

      return false;
    }
  }

  return true; //{ token: accessToken, id: userId };
}

async function refreshAccessToken(refreshToken) {
  try {
    const response = await axiosInstanceBasicAuth.post('/api/auth/refresh/', { refresh: refreshToken });
    const newAccessToken = response.data.access;
    setToken(newAccessToken);
    setRefreshToken(response.data.refresh);
    return newAccessToken;
  } catch (error) {
    console.error('Fehler beim Refresh des Tokens:', error);
    return false; // Falls das Refresh-Token ungültig ist
  }
}

/*
 * Use token expiration to check if the token is valid
 */
function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    console.log('istokenexpired', payload.exp, currentTime);
    console.log('istokenexpiredresult', payload.exp < currentTime);
    return payload.exp < currentTime;
  } catch (error) {
    console.log(error);
    return true;
  }
}

const getToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

const setToken = token => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

const setRefreshToken = token => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export { checkAuth, refreshAccessToken, getToken, setToken, removeToken, removeRefreshToken, getRefreshToken };
