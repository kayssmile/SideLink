import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';

import { theme } from 'src/config/theme.js';
import { renderWithDashboardReducer } from '/testing/unit_integration/utils/RenderWithRedux.jsx';

import Header from 'src/components/dashboard/shared/header/vertical/Header.jsx';

const renderHeaderComponent = preloadedState => {
  return renderWithDashboardReducer(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </ThemeProvider>,
    { preloadedState }
  );
};

describe('Header component', () => {
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

  it('renders header component', () => {
    renderHeaderComponent({ dashboard: mockState });
    expect(screen.getByTestId('dashboard-header')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-header-hamburger')).toBeInTheDocument();
    screen.debug();
    expect(screen.getByText('Jungle Banana')).toBeInTheDocument();
  });

  it('toggles state on hamburger click', () => {
    const { store } = renderHeaderComponent({ dashboard: mockState });
    const hamburgerButton = screen.getByTestId('dashboard-header-hamburger');
    fireEvent.click(hamburgerButton);
    const state = store.getState();
    expect(state.dashboard.sidebar).not.toEqual(mockState.sidebar);
  });
});
