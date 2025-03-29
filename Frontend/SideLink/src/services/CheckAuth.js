import { axiosInstanceBasic } from 'src/api/AxiosInstance';

async function checkAuth() {
  let accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    console.log('Kein Access-Token gefunden. Benutzer ist nicht eingeloggt.');
    return false;
  }

  try {
    await axiosInstanceBasic.post('/api/auth/verify/', { token: accessToken });

    // Token ist gültig, also Benutzer-Infos laden
    const userId = JSON.parse(localStorage.getItem('userInfo') || '{}');
    return { token: accessToken, id: userId };
  } catch (error) {
    console.log('Access-Token abgelaufen. Versuche zu erneuern...');

    const newAccessToken = await refreshAccessToken();

    if (newAccessToken) {
      console.log('Neues Access-Token erhalten.');
      const userId = JSON.parse(localStorage.getItem('userInfo') || '{}');
      return { token: newAccessToken, id: userId };
    } else {
      console.log('Benutzer ist nicht eingeloggt.');
      return false;
    }
  }
}

async function refreshAccessToken() {
  try {
    const response = await axiosInstanceBasic.post('/api/auth/refresh/', {});
    const newAccessToken = response.data.access;
    localStorage.setItem('accessToken', newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('Fehler beim Refresh des Tokens:', error);
    return false; // Falls das Refresh-Token ungültig ist
  }
}

export { checkAuth, refreshAccessToken };

/*
axiosInstanceBasic.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      console.log('401 Fehler: Versuche, Token zu erneuern...');
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(error.config);
      }
    }
    return Promise.reject(error);
  }
); */
