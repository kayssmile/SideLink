import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { darkTheme, lightTheme } from 'src/config/Theme.js';
import { checkAuth } from 'src/services/AuthService';
import { basicPostRequest } from 'src/services/GenericRequests';
import getDashboardData from 'src/store/dashboard/shared/actions/GetDashboardDataAction';
import getPublicData from 'src/store/publicdata/actions/GetPublicDataAction';
import router from 'src/routes/Router';

function App() {
  const themeMode = useSelector(state => state.publicData.themeMode);
  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        dispatch(getPublicData());
        if (await checkAuth()) {
          dispatch(getDashboardData());
        }
        await basicPostRequest('api/analytics-data/create-visit/', {});
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    };
    init();
  }, [dispatch]);

  return (
    <ThemeProvider theme={currentTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
