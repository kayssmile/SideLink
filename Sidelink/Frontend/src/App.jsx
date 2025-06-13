import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { darkTheme, lightTheme } from 'src/config/Theme.js';
import { checkAuth } from 'src/services/AuthService';
import { basicPostRequest, basicGetRequest } from 'src/services/BasicRequests';
import getDashboardData from 'src/store/dashboard/shared/actions/GetDashboardDataAction';
import getPublicData from 'src/store/publicdata/actions/GetPublicDataAction';
import router from 'src/routes/Router';

function App() {
  const { themeMode, publicData } = useSelector(state => state.publicData);
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
        const response = await basicGetRequest('api/auth/csrf/');

        console.log('CSRF Token:', response.data.csrfToken);
        localStorage.setItem('csrfToken', response.data.csrfToken);
        console.log('CSRF Token Response:', response);
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    };
    init();
  }, [dispatch]);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  useEffect(() => {
    console.log(publicData.success);
    console.log(document.cookie);
    if (publicData.success) {
      const csrfToken = getCookie('csrftoken');

      console.log('CSRF Token:', csrfToken);
    }
  }, [publicData.success]);

  return (
    <ThemeProvider theme={currentTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
