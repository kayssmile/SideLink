import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from '@emotion/react';
import { useDispatch } from 'react-redux';

import { theme } from 'src/config/theme.js';
import { checkAuth, getToken } from 'src/services/AuthService';
import getDashboardData from 'src/store/dashboard/shared/actions/GetDashboardDataAction';
import getPublicData from 'src/store/publicdata/actions/GetPublicDataAction';

import router from 'src/routes/router';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPublicData());
    const checkLoggedIn = async () => {
      if (await checkAuth()) {
        const token = getToken();
        if (token) {
          dispatch(getDashboardData(token));
        }
      }
    };
    checkLoggedIn();
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
