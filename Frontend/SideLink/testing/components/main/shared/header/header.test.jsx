import { render, screen, fireEvent } from '@testing-library/react';
import Header from 'src/components/main/shared/header/header';
import { ThemeProvider } from '@emotion/react';
import { theme } from 'src/theme/theme.js';
//import * as MuiMaterial from '@mui/material';
import renderWithRedux from '/testing/utility/RenderWithRedux';

import { MemoryRouter } from 'react-router-dom';

const renderComponent = preloadedState => {
  return renderWithRedux(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </ThemeProvider>,
    { preloadedState }
  );
};

describe('Header Component', () => {
  const mockStateLoggedOut = {
    loading: false,
    userInfo: null,
    error: null,
    success: false,
  };

  it('renders without crashing', () => {
    renderComponent({ userManagment: mockStateLoggedOut });
    expect(screen.getByTestId('main-header')).toBeInTheDocument();
  });

  it('renders all childcomponents', () => {
    renderComponent({ userManagment: mockStateLoggedOut });
    expect(screen.getByAltText('Logo Sidelink')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('hamburger')).toBeInTheDocument();
  });

  it('opens sidebar on click to hamburger', () => {
    renderComponent({ userManagment: mockStateLoggedOut });
    const hamburger = screen.getByTestId('hamburger');
    fireEvent.click(hamburger);
    expect(screen.getByTestId('sentinelStart')).toBeInTheDocument();
  });

  /* 
  vi.mock('@mui/material', () => ({
      ...MuiMaterial,
      useMediaQuery: vi.fn(() => false),
    }));

   vi.restoreAllMocks();
  */
});
