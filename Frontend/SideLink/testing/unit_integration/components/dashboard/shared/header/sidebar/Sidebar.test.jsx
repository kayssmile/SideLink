import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';

import { theme } from 'src/config/theme.js';
import { renderWithDashboardReducer } from '/testing/unit_integration/utils/RenderWithRedux.jsx';
import setMediaQuery from '/testing/unit_integration/utils/setMediaQuery';

import Sidebar from 'src/components/dashboard/shared/header/sidebar/Sidebar.jsx';

const renderHeaderComponent = preloadedState => {
  return renderWithDashboardReducer(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    </ThemeProvider>,

    { preloadedState }
  );
};

describe('Sidebar component', () => {
  const mockState = {
    sidebar: true,
    themeMode: 'light',
    dashboardData: {
      user: { first_name: 'Jungle', last_name: 'Banana' },
      publicProfile: {},
      publicServices: {},
      success: false,
      error: false,
      loading: false,
    },
  };

  it('renders sidebar component', () => {
    renderHeaderComponent({ dashboard: mockState });
    expect(screen.getByTestId('dashboard-sidebar')).toBeInTheDocument();
    const logoImg = screen.getByAltText('Logo Sidelink');
    expect(logoImg).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dienstleistung Verwaltung')).toBeInTheDocument();
    expect(screen.getByText('Öffentliches Profil')).toBeInTheDocument();
    expect(screen.getByText('Einstellungen')).toBeInTheDocument();
    expect(screen.getByText('Account Verwaltung')).toBeInTheDocument();
    expect(screen.getByText('Account Verwaltung')).toBeInTheDocument();
    const logoutLink = screen.getByLabelText('logout');
    expect(logoutLink).toBeInTheDocument();
  });

  it('toggles sidebar onclick', () => {
    const restoreMatchMedia = setMediaQuery(true);
    renderHeaderComponent({ dashboard: mockState });
    const toggleBtn = screen.getByLabelText('menu');
    expect(toggleBtn).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    const sidebar = screen.getByTestId('dashboard-sidebar');
    expect(sidebar).toHaveStyle('width: 0px');
    restoreMatchMedia();
  });
});
