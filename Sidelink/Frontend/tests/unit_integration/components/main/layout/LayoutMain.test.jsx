import { screen } from '@testing-library/react';
import LayoutMain from 'src/components/main/layout/LayoutMain';
import { darkTheme } from 'src/config/Theme.js';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithAllReducers } from '@tests/utils/RenderWithRedux';

describe('LayoutMain Component', () => {
  const renderComponent = preloadedState => {
    return renderWithAllReducers(
      <ThemeProvider theme={darkTheme}>
        <MemoryRouter>
          <LayoutMain />
        </MemoryRouter>
      </ThemeProvider>,
      { preloadedState }
    );
  };

  const mockStatePublicData = {
    mobileSidebar: false,
    themeMode: 'dark',
  };

  const mockStateUserMangment = {
    infoModal: false,
  };

  it('renders without crashing', () => {
    renderComponent({ publicData: mockStatePublicData, userManagment: mockStateUserMangment });
    expect(screen.getByTestId('layout-main')).toBeInTheDocument();
  });

  it('renders the header component', () => {
    renderComponent({ publicData: mockStatePublicData, userManagment: mockStateUserMangment });
    expect(screen.getByTestId('main-header')).toBeInTheDocument();
  });

  it('renders the footer component', () => {
    renderComponent({ publicData: mockStatePublicData, userManagment: mockStateUserMangment });
    expect(screen.getByTestId('main-footer')).toBeInTheDocument();
  });

  it('renders the main tag', () => {
    renderComponent({ publicData: mockStatePublicData, userManagment: mockStateUserMangment });
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
