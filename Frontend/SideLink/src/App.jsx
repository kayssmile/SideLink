import { theme } from 'src/theme/theme.js';
import { ThemeProvider } from '@emotion/react';

import { RouterProvider } from 'react-router';
import router from 'src/routes/router';

import { useDispatch, useSelector } from 'react-redux';

import { axiosInstanceBasic } from 'src/store/usermanagment/services/AxiosInstance';

function App() {
  async function checkAuth() {
    try {
      /* For development use refreshToken from localStorage
      const refresh_token = localStorage.getItem('refreshToken'); */

      const { data } = await axiosInstanceBasic.post('api/auth/refresh/', {});
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Ein unbekannter Fehler ist aufgetreten';
      console.log(errorMessage);
    }
  }

  checkAuth();

  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
