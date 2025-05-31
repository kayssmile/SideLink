import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';

import { darkTheme, lightTheme } from 'src/config/Theme.js';
import { checkAuth, getToken } from 'src/services/AuthService';
import getDashboardData from 'src/store/dashboard/shared/actions/GetDashboardDataAction';
import getPublicData from 'src/store/publicdata/actions/GetPublicDataAction';

import router from 'src/routes/Router';

function App() {
  const themeMode = useSelector(state => state.publicData.themeMode);
  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;
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
      <ThemeProvider theme={currentTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
