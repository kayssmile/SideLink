import { render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';
import { theme } from 'src/config/theme';

export const renderWithProviders = ui => {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>{ui}</MemoryRouter>
    </ThemeProvider>
  );
};

export default renderWithProviders;
