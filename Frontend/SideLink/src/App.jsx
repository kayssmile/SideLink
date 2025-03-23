import { theme } from 'src/theme/theme.js';
import { ThemeProvider } from '@emotion/react';

import { RouterProvider } from 'react-router';
import router from 'src/routes/router';

import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { axiosInstanceFormData } from 'src/store/usermanagment/services/AxiosInstance';

function App() {
  async function checkAuth() {
    try {
      const { data } = await axiosInstanceFormData.post('api/auth/refresh/', {});
      console.log(data);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Ein unbekannter Fehler ist aufgetreten';
      console.log(errorMessage);
    }
  }
  ///api/auth/refresh/
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
