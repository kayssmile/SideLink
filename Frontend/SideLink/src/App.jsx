import { theme } from 'src/theme/theme.js';
import { ThemeProvider } from '@emotion/react';

import { RouterProvider } from 'react-router';
import router from 'src/routes/router';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
