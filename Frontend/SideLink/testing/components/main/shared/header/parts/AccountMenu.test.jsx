import { render, screen, fireEvent } from '@testing-library/react';
import AccountMenu from 'src/components/main/shared/header/parts/AccountMenu';
import { MemoryRouter } from 'react-router-dom';
import renderWithRedux from '/testing/utility/RenderWithRedux';
import { theme } from 'src/theme/theme.js';
import { ThemeProvider } from '@emotion/react';

const renderAccountMenu = (preloadedState, mdUp = true) => {
  renderWithRedux(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <AccountMenu mdUp={mdUp} />
      </MemoryRouter>
    </ThemeProvider>,
    { preloadedState }
  );
};

describe('AccountMenu Component', () => {
  const mockStateLoggedOut = {
    loading: false,
    userInfo: null,
    error: null,
    success: false,
  };

  const mockStateLoggedIn = {
    loading: false,
    userInfo: { first_name: 'Mind', last_name: 'Flow' },
    error: null,
    success: false,
  };

  it('renders without crashing', () => {
    renderAccountMenu({ userManagment: mockStateLoggedOut });
  });

  it('shows login button when no user is logged in', () => {
    renderAccountMenu({ userManagment: mockStateLoggedOut });
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  it('shows userinformation when user is logged in', () => {
    renderAccountMenu({ userManagment: mockStateLoggedIn });
    expect(screen.getByText('Mind Flow')).toBeInTheDocument();
  });
  /*
  it('shows hamburger if breakpoint property is false', () => {
    renderAccountMenu({ preloadedState: { userManagment: mockStateLoggedIn }, mdUp: false });
    expect(screen.getByTestId('hamburger')).toBeInTheDocument();
  });


  it('displays user name and email in menu', () => {
    renderWithRedux({ user: { currentUser: mockUser } });

    const avatar = screen.getByAltText('User profile');
    fireEvent.click(avatar);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('calls logout handler when logout is clicked', () => {
    const { store } = renderWithRedux({ user: { currentUser: mockUser } });

    const avatar = screen.getByAltText('User profile');
    fireEvent.click(avatar);

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    // Überprüfen, ob die Aktion `user/logoutUser` ausgelöst wurde
    const actions = store.getState().user;
    expect(actions.currentUser).toBe(null);
  });   */
});
