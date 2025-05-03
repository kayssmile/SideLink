import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from 'src/components/main/authentication/Login';
import { ThemeProvider } from '@emotion/react';
import { theme } from 'src/theme/theme.js';
import renderWithRedux from '/testing/unit_integration/utils/RenderWithRedux';

import { MemoryRouter } from 'react-router-dom';

const renderLoginComponent = preloadedState => {
  return renderWithRedux(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </ThemeProvider>,
    { preloadedState }
  );
};

describe('Login Component', () => {
  const mockStateLoggedOut = {
    userManagment: {
      loading: false,
      userInfo: null,
      error: null,
      success: false,
    },
  };

  const mockStateLoading = {
    userManagment: {
      loading: true,
      userInfo: null,
      error: null,
      success: false,
    },
  };

  const mockStateError = {
    userManagment: {
      loading: false,
      userInfo: null,
      error: 'Invalid credentials',
      success: false,
    },
  };

  it('renders login form', () => {
    renderLoginComponent(mockStateLoggedOut);
    expect(screen.getByText('Welcome back to SideLink')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    renderLoginComponent(mockStateLoggedOut);
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByText('Ungültige E-Mail')).toBeInTheDocument();
      expect(screen.getByText('Mindestens 6 Zeichen')).toBeInTheDocument();
    });
  });

  it('shows loading state', () => {
    renderLoginComponent(mockStateLoading);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows error message', () => {
    renderLoginComponent(mockStateError);
    expect(screen.getByText('Technische Störungen, bitte versuche es später nochmals oder')).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const { store } = renderLoginComponent({ userManagment: mockStateLoggedOut });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    const state = store.getState();
    expect(state.userManagment.userInfo).not.toEqual(mockStateLoggedOut.userManagment.userInfo);
  });
});
