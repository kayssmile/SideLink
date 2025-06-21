import { screen, fireEvent, waitFor } from '@testing-library/react';
import Registration from 'src/components/main/authentication/Registration';
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

const renderRegistrationComponent = preloadedState => {
  return renderWithAllReducers(
    <ThemeProvider theme={darkTheme}>
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    </ThemeProvider>,
    { preloadedState }
  );
};

describe('Registration Component', () => {
  const mockStateInitial = {
    loading: { register: false },
    error: { register: false },
    success: { register: false },
  };

  const mockStateLoading = {
    loading: { register: true },
    error: { register: false },
    success: { register: false },
  };

  const mockStateError = {
    loading: { register: false },
    error: { register: true },
    success: { register: false },
  };

  const mockStateSuccess = {
    loading: { register: false },
    error: { register: false },
    success: { register: true },
  };

  it('renders registration form', () => {
    renderRegistrationComponent({ userManagment: mockStateInitial });
    expect(screen.getByText('Registration.')).toBeInTheDocument();
    expect(screen.getByText('Welcome to SideLink')).toBeInTheDocument();
    expect(screen.getByLabelText('Vorname *')).toBeInTheDocument();
    expect(screen.getByLabelText('Nachname *')).toBeInTheDocument();
    expect(screen.getByLabelText('Beruf *')).toBeInTheDocument();
    expect(screen.getByLabelText('Telefon *')).toBeInTheDocument();
    expect(screen.getByLabelText('Strasse / Hausnummer *')).toBeInTheDocument();
    expect(screen.getByLabelText('Postleitzahl *')).toBeInTheDocument();
    expect(screen.getByLabelText('Ort *')).toBeInTheDocument();
    expect(screen.getByLabelText('Region *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email *')).toBeInTheDocument();
    expect(screen.getByLabelText('Password *')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Registrieren' })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    renderRegistrationComponent({ userManagment: mockStateInitial });
    fireEvent.click(screen.getByRole('button', { name: 'Registrieren' }));
    await waitFor(() => {
      expect(screen.getAllByText(/ist erforderlich/).length).toBeGreaterThan(0);
    });
  });

  it('shows loading state', () => {
    renderRegistrationComponent({ userManagment: mockStateLoading });
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows error message', () => {
    renderRegistrationComponent({ userManagment: mockStateError });
    expect(screen.getByText(/Technische Störungen, bitte versuche es später nochmals oder/)).toBeInTheDocument();
  });

  it('shows success message', () => {
    renderRegistrationComponent({ userManagment: mockStateSuccess });
    expect(screen.getByText(/Registrierung erfolgreich/)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    renderRegistrationComponent({ userManagment: mockStateInitial });
    fireEvent.change(screen.getByLabelText('Vorname *'), { target: { value: 'Max' } });
    fireEvent.change(screen.getByLabelText('Nachname *'), { target: { value: 'Mustermann' } });
    fireEvent.change(screen.getByLabelText('Beruf *'), { target: { value: 'Developer' } });
    fireEvent.change(screen.getByLabelText('Telefon *'), { target: { value: '0123456789' } });
    fireEvent.change(screen.getByLabelText('Strasse / Hausnummer *'), { target: { value: 'Musterstrasse 1' } });
    fireEvent.change(screen.getByLabelText('Postleitzahl *'), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText('Ort *'), { target: { value: 'Musterstadt' } });
    fireEvent.change(screen.getByLabelText('Region *'), { target: { value: 'Musterregion' } });
    fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('Password *'), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: 'Registrieren' }));
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });
});
