import { render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';
import { darkTheme } from 'src/config/Theme.js';

export const renderWithProviders = ui => {
  return render(
    <ThemeProvider theme={darkTheme}>
      <MemoryRouter>{ui}</MemoryRouter>
    </ThemeProvider>
  );
};

export default renderWithProviders;
