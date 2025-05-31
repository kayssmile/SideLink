import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from 'src/components/main/authentication/Login';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from 'src/config/Theme.js';
import { renderWithAllReducers } from '@tests/utils/RenderWithRedux';

import { MemoryRouter } from 'react-router-dom';

const mockDispatch = vi.fn();

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderLoginComponent = preloadedState => {
  return renderWithAllReducers(
    <ThemeProvider theme={darkTheme}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </ThemeProvider>,
    { preloadedState }
  );
};

describe('Login Component', () => {
  const mockStateLoggedOut = {
    loading: { login: false, register: false, init: false },
    userInfo: null,
    error: { login: false, register: false, init: false },
    success: { login: false, register: false, init: false },
  };

  const mockStateLoading = {
    loading: { login: true, register: false, init: false },
    userInfo: null,
    error: { login: false, register: false, init: false },
    success: { login: false, register: false, init: false },
  };

  const mockStateError = {
    loading: { login: false, register: false, init: false },
    userInfo: null,
    error: { login: true, register: false, init: false },
    success: { login: false, register: false, init: false },
  };

  const mockStateSuccess = {
    loading: { login: false, register: false, init: false },
    userInfo: null,
    error: { login: false, register: false, init: false },
    success: { login: true, register: false, init: false },
  };

  const dashboardData = {
    dashboardData: {
      success: true,
    },
  };

  it('renders login form', () => {
    renderLoginComponent({ userManagment: mockStateLoggedOut });
    screen.debug();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email *')).toBeInTheDocument();
    expect(screen.getByLabelText('Password *')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Neu hier? Registriere dich hier' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Passwort vergessen?' })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    renderLoginComponent({ userManagment: mockStateLoggedOut });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByText('Ungültige E-Mail')).toBeInTheDocument();
      expect(screen.getByText('Mindestens 6 Zeichen')).toBeInTheDocument();
    });
  });

  it('shows loading state', () => {
    renderLoginComponent({ userManagment: mockStateLoading });
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows error message', () => {
    renderLoginComponent({ userManagment: mockStateError });
    expect(screen.getByText('Technische Störungen, bitte versuche es später nochmals oder')).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    renderLoginComponent({ userManagment: mockStateLoggedOut });
    fireEvent.change(screen.getByLabelText('Email *'), {
      target: { value: 'test@test.ch' },
    });
    fireEvent.change(screen.getByLabelText('Password *'), {
      target: { value: '123456A!' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });

  it('laods dashboard data on success', async () => {
    renderLoginComponent({ userManagment: mockStateSuccess });
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });

  it('redirects to dashboard on successful login', async () => {
    renderLoginComponent({ dashboard: dashboardData });
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
});
