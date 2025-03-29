import { RouterProvider } from 'react-router';
import router from 'src/routes/router';
import { theme } from 'src/theme/theme.js';
import { ThemeProvider } from '@emotion/react';

import { useDispatch } from 'react-redux';
import { checkAuth } from 'src/services/CheckAuth';
import getUser from 'src/store/usermanagment/services/GetUserAction';

function App() {
  const dispatch = useDispatch();
  const checkLoggedIn = async () => {
    const { token, id } = await checkAuth();
    if (token && id) {
      dispatch(getUser(token));
    }
  };

  checkLoggedIn();

  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
