import { screen } from '@testing-library/react';
import MobileSidebar from 'src/components/main/shared/header/parts/MobileSidebar';
import { MemoryRouter } from 'react-router-dom';
import renderWithRedux from '/testing/unit_integration/utility/RenderWithRedux';
import { theme } from 'src/theme/theme.js';
import { ThemeProvider } from '@emotion/react';

const renderMobileSidebar = preloadedState => {
  renderWithRedux(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <MobileSidebar />
      </MemoryRouter>
    </ThemeProvider>,
    { preloadedState }
  );
};

describe('MobileSidebar Component', () => {
  const mockStateLoggedIn = {
    loading: false,
    userInfo: { first_name: 'Mind', last_name: 'Flow' },
    error: null,
    success: false,
  };

  it('renders without crashing', () => {
    renderMobileSidebar({ userManagment: mockStateLoggedIn });
  });

  it('renders all childcomponents', () => {
    renderMobileSidebar({ userManagment: mockStateLoggedIn });
    expect(screen.getByAltText('Logo Sidelink')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Mind Flow')).toBeInTheDocument();
  });
});
