import { screen } from '@testing-library/react';
import MobileSidebar from 'src/components/main/shared/header/parts/MobileSidebar';
import { MemoryRouter } from 'react-router-dom';
import { renderWithDashboardReducer } from '@tests/utils/RenderWithRedux';
import { darkTheme } from 'src/config/Theme.js';
import { ThemeProvider } from '@emotion/react';

const renderMobileSidebar = preloadedState => {
  renderWithDashboardReducer(
    <ThemeProvider theme={darkTheme}>
      <MemoryRouter>
        <MobileSidebar />
      </MemoryRouter>
    </ThemeProvider>,
    { preloadedState }
  );
};

describe('MobileSidebar Component', () => {
  const mockStateLoggedIn = {
    dashboardData: {
      user: { email: 'test@admin.ch', first_name: 'Mind', last_name: 'Flow', profession: 'Developer' },
      publicProfile: {},
      publicServices: {},
      success: false,
      error: false,
      loading: false,
    },
  };

  it('renders without crashing', () => {
    renderMobileSidebar({ dashboard: mockStateLoggedIn });
  });

  it('renders all childcomponents', () => {
    renderMobileSidebar({ dashboard: mockStateLoggedIn });
    expect(screen.getByAltText('Logo Sidelink')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Mind Flow')).toBeInTheDocument();
  });
});
