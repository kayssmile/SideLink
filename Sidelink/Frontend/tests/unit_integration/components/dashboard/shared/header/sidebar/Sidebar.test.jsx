import { screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';
import { darkTheme } from 'src/config/Theme.js';
import { renderWithDashboardReducer } from '@tests/utils/RenderWithRedux.jsx';
import setMediaQuery from '@tests/utils/SetMediaQuery';
import Sidebar from 'src/components/dashboard/shared/header/sidebar/Sidebar.jsx';

const mockNavigate = vi.fn();
const mockUseLocation = vi.fn(() => ({ pathname: '/dashboard' }));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockUseLocation,
  };
});

const renderSidebarComponent = preloadedState => {
  return renderWithDashboardReducer(
    <ThemeProvider theme={darkTheme}>
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
    renderSidebarComponent({ dashboard: mockState });
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
    renderSidebarComponent({ dashboard: mockState });
    const toggleBtn = screen.getByLabelText('toggle sidebar');
    expect(toggleBtn).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    const sidebar = screen.getByTestId('dashboard-sidebar');
    expect(sidebar).toHaveStyle('width: 0px');
    restoreMatchMedia();
  });
});
