import { screen } from '@testing-library/react';
import AccountMenu from 'src/components/main/shared/header/parts/AccountMenu';
import { MemoryRouter } from 'react-router-dom';
import { renderWithDashboardReducer } from '@tests/utils/RenderWithRedux';
import { darkTheme } from 'src/config/Theme.js';
import { ThemeProvider } from '@emotion/react';

const renderAccountMenu = preloadedState => {
  renderWithDashboardReducer(
    <ThemeProvider theme={darkTheme}>
      <MemoryRouter>
        <AccountMenu />
      </MemoryRouter>
    </ThemeProvider>,
    { preloadedState }
  );
};

describe('AccountMenu Component', () => {
  const mockStateLoggedOut = {
    dashboardData: {
      user: {},
    },
  };

  const mockStateLoggedIn = {
    dashboardData: {
      user: { email: 'test@admin.ch', first_name: 'Mind', last_name: 'Flow', profession: 'Developer' },
    },
  };

  it('renders without crashing', () => {
    renderAccountMenu({ dashboard: mockStateLoggedOut });
  });

  it('shows login button when user is logged out', () => {
    renderAccountMenu({ dashboard: mockStateLoggedOut });
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  it('shows userinformation when user is logged in', () => {
    renderAccountMenu({ dashboard: mockStateLoggedIn });
    expect(screen.getByText('Mind Flow')).toBeInTheDocument();
  });
});
