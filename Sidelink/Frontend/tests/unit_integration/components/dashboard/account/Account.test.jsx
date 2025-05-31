import { render, screen, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';

import Account from 'src/components/dashboard/account/Account';
import { darkTheme } from 'src/config/Theme.js';
import store from 'src/store/store';

const renderWithProviders = () => {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <MemoryRouter>
          <Account />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
};

describe('Account Component', () => {
  it('renders the tabs', () => {
    renderWithProviders();
    const tablist = screen.getByRole('tablist');
    within(tablist).getByText('Account');
    within(tablist).getByText('Anmeldedaten');
  });

  it('displays AccountDetails by default', () => {
    renderWithProviders();
    expect(screen.getByText('Ändere deine Accountdaten hier')).toBeInTheDocument();
  });

  it('switches to Credentials tab when clicked', () => {
    renderWithProviders();
    fireEvent.click(screen.getByText('Anmeldedaten'));
    expect(screen.getByText('Email')).toBeInTheDocument();
  });
});
