import { axiosInstanceBasicAuth } from 'src/api/AxiosInstance';
import { getToken, setToken, removeToken, getRefreshToken, setRefreshToken, removeRefreshToken, isTokenExpired } from 'src/components/shared/utils/TokenUtils';

async function checkAuth() {
  let accessToken = getToken();
  let refreshToken = getRefreshToken();
  if (!accessToken) return false;
  if (isTokenExpired(accessToken)) {
    if (refreshToken && !isTokenExpired(refreshToken)) {
      try {
        console.log('Token expired, refreshing...');
        await refreshAccessToken(refreshToken);
        return true;
      } catch (error) {
        console.log('Error refreshing token:', error);
        removeToken();
        return false;
      }
    } else {
      removeRefreshToken();
      return false;
    }
  }
  return true;
}

async function refreshAccessToken(refreshToken) {
  try {
    const response = await axiosInstanceBasicAuth.post('/api/auth/refresh/', { refresh: refreshToken });
    if (response.data.access) setToken(newAccessToken);
    if (response.data.refresh) setRefreshToken(response.data.refresh);
    return newAccessToken;
  } catch (error) {
    console.error('Fehler beim Refresh des Tokens:', error);
    return false;
  }
}

export { checkAuth, refreshAccessToken };
