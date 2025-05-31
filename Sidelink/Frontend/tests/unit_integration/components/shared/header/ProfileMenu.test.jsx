import { screen, fireEvent } from '@testing-library/react';
import ProfileMenu from '/src/components/shared/header/ProfileMenu';
import { renderWithAllReducers } from '@tests/utils/RenderWithRedux';
import { darkTheme } from 'src/config/Theme.js';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';

const renderProfileMenu = preloadedState => {
  return renderWithAllReducers(
    <ThemeProvider theme={darkTheme}>
      <MemoryRouter>
        <ProfileMenu />
      </MemoryRouter>
    </ThemeProvider>,
    { preloadedState }
  );
};

describe('ProfileMenu Component', () => {
  const mockStateLoggedIn = {
    dashboardData: {
      user: { email: 'test@admin.ch', last_name: 'Flow', first_name: 'Mind' },
      publicProfile: {},
      publicServices: {},
      success: false,
      error: false,
      loading: false,
    },
  };

  it('renders without crashing', () => {
    renderProfileMenu({ dashboard: mockStateLoggedIn });
    expect(screen.getByText('Mind Flow')).toBeInTheDocument();
  });

  it('shows user information when user is logged in', () => {
    renderProfileMenu({ dashboard: mockStateLoggedIn });
    expect(screen.getByText('Mind Flow')).toBeInTheDocument();
  });

  it('opens menu when clicked', () => {
    const { container } = renderProfileMenu({ dashboard: mockStateLoggedIn });
    const profileMenuBtn = container.querySelector('.MuiButtonBase-root');
    fireEvent.click(profileMenuBtn);
    expect(screen.getByText('test@admin.ch')).toBeInTheDocument();
    expect(screen.getByText('Meine Dienstleistungen')).toBeInTheDocument();
  });

  it('contains menuoptions when clicked', () => {
    const { container } = renderProfileMenu({ dashboard: mockStateLoggedIn });
    const profileMenuBtn = container.querySelector('.MuiButtonBase-root');
    fireEvent.click(profileMenuBtn);
    expect(screen.getByText('Meine Dienstleistungen')).toBeInTheDocument();
    expect(screen.getByText('Mein Öffentliches Profil')).toBeInTheDocument();
    expect(screen.getByText('Mein Konto')).toBeInTheDocument();
  });

  it('dispatches logout action when logout clicked', () => {
    const { container, store } = renderProfileMenu({ dashboard: mockStateLoggedIn });
    const profileMenuBtn = container.querySelector('.MuiButtonBase-root');
    fireEvent.click(profileMenuBtn);
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    const state = store.getState();
    expect(state.userManagment.userInfo).toBe(null);
  });
});
