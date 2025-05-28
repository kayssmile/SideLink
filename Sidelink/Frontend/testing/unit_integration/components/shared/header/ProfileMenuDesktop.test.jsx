import { screen, fireEvent } from '@testing-library/react';
import ProfileMenuDesktop from '/src/components/shared/header/ProfileMenuDesktop';
import renderWithRedux from '/testing/unit_integration/utility/RenderWithRedux';
import { theme } from 'src/theme/theme.js';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';

const renderProfileMenuDesktop = preloadedState => {
  return renderWithRedux(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <ProfileMenuDesktop />
      </MemoryRouter>
    </ThemeProvider>,
    { preloadedState }
  );
};

describe('ProfileMenuDesktop Component', () => {
  const mockStateLoggedIn = {
    loading: false,
    userInfo: { first_name: 'Mind', last_name: 'Flow', email: 'mindflow@react.ch' },
    error: null,
    success: false,
  };

  const mockStateLoggedOut = {
    loading: false,
    userInfo: null,
    error: null,
    success: false,
  };

  it('renders without crashing', () => {
    renderProfileMenuDesktop({ userManagment: mockStateLoggedIn });
    expect(screen.getByText('Mind Flow')).toBeInTheDocument();
  });

  it('shows user information when user is logged in', () => {
    renderProfileMenuDesktop({ userManagment: mockStateLoggedIn });
    expect(screen.getByText('Mind Flow')).toBeInTheDocument();
  });

  it('opens menu when clicked', () => {
    const { container } = renderProfileMenuDesktop({ userManagment: mockStateLoggedIn });
    const profileMenuBtn = container.querySelector('.MuiButtonBase-root');
    fireEvent.click(profileMenuBtn);
    expect(screen.getByText('mindflow@react.ch')).toBeInTheDocument();
    expect(screen.getByText('Meine Dienstleistungen')).toBeInTheDocument();
  });

  it('contains menuoptions when clicked', () => {
    const { container } = renderProfileMenuDesktop({ userManagment: mockStateLoggedIn });
    const profileMenuBtn = container.querySelector('.MuiButtonBase-root');
    fireEvent.click(profileMenuBtn);
    expect(screen.getByText('Meine Dienstleistungen')).toBeInTheDocument();
    expect(screen.getByText('Dienstleistungen')).toBeInTheDocument();
  });

  it('dispatches logout action when logout clicked', () => {
    const { container, store } = renderProfileMenuDesktop({ userManagment: mockStateLoggedIn });
    const profileMenuBtn = container.querySelector('.MuiButtonBase-root');
    fireEvent.click(profileMenuBtn);
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    const state = store.getState();
    expect(state.userManagment.userInfo).toBe(false);
  });
});
