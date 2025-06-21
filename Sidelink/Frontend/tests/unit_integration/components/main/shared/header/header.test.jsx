import { screen, fireEvent } from '@testing-library/react';
import Header from 'src/components/main/shared/header/header';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from 'src/config/Theme.js';
import { renderWithPublicDataReducer } from '@tests/utils/RenderWithRedux';
import { renderWithAllReducers } from '@tests/utils/RenderWithRedux';
import { MemoryRouter } from 'react-router-dom';

const renderComponent = preloadedState => {
  return renderWithPublicDataReducer(
    <ThemeProvider theme={darkTheme}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </ThemeProvider>,
    { preloadedState }
  );
};

describe('Header Component', () => {
  const mockStatePublicData = {
    mobileSidebar: false,
    themeMode: 'dark',
  };

  const mockStateDashboardData = {
    dashboardData: {
      user: { email: 'test@admin.ch' },
      publicProfile: {},
      publicServices: {},
      success: false,
      error: false,
      loading: false,
    },
  };

  it('renders without crashing', () => {
    renderComponent({ publicData: mockStatePublicData });
    expect(screen.getByTestId('main-header')).toBeInTheDocument();
  });

  it('renders all childcomponents', () => {
    renderComponent({ publicData: mockStatePublicData });
    expect(screen.getByAltText('Logo Sidelink')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('hamburger')).toBeInTheDocument();
  });

  it('opens sidebar on click to hamburger', () => {
    renderWithAllReducers(
      <ThemeProvider theme={darkTheme}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>,
      { publicData: mockStatePublicData, dashboard: mockStateDashboardData }
    );
    const hamburger = screen.getByTestId('hamburger');
    fireEvent.click(hamburger);
    expect(screen.getByTestId('sentinelStart')).toBeInTheDocument();
  });
});
