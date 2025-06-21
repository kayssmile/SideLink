import { screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';
import { darkTheme } from 'src/config/theme.js';
import { renderWithAllReducers } from '@tests/utils/RenderWithRedux.jsx';
import Header from 'src/components/dashboard/shared/header/vertical/Header.jsx';

const renderHeaderComponent = preloadedState => {
  return renderWithAllReducers(
    <ThemeProvider theme={darkTheme}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </ThemeProvider>,
    { preloadedState }
  );
};

describe('Header component', () => {
  const mockDashboardState = {
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

  const mockPublicData = {
    themeMode: 'dark',
  };

  it('renders header component', () => {
    renderHeaderComponent({ dashboard: mockDashboardState, publicData: mockPublicData });
    expect(screen.getByTestId('dashboard-header')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-header-hamburger')).toBeInTheDocument();
    expect(screen.getByText('Jungle Banana')).toBeInTheDocument();
  });

  it('toggles state on hamburger click', () => {
    const { store } = renderHeaderComponent({ dashboard: mockDashboardState, publicData: mockPublicData });
    const hamburgerButton = screen.getByTestId('dashboard-header-hamburger');
    fireEvent.click(hamburgerButton);
    const state = store.getState();
    expect(state.dashboard.sidebar).not.toEqual(mockDashboardState.sidebar);
  });
});
