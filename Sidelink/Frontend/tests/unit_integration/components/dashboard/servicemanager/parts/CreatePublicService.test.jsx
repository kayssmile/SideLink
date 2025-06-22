import { screen, fireEvent, waitFor } from '@testing-library/react';
import CreatePublicService from 'src/components/dashboard/servicemanager/parts/CreatePublicService';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from 'src/config/Theme.js';
import { renderWithAllReducers } from '@tests/utils/RenderWithRedux';
import * as AuthService from 'src/services/AuthService';

vi.mock('src/services/AuthService');
const mockDispatch = vi.fn();

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

const renderComponent = (preloadedState, service_type) => {
  return renderWithAllReducers(
    <ThemeProvider theme={darkTheme}>
      <CreatePublicService type={service_type} />
    </ThemeProvider>,
    { preloadedState }
  );
};

describe('Create public-service component', () => {
  const mockStatePublicServices = {
    publicServices: {
      data: false,
      success: false,
      error: false,
      loading: false,
    },
  };

  it('renders without crashing', () => {
    renderComponent({ publicServices: mockStatePublicServices }, 'offer');
    expect(screen.getByText('Neues Angebot erstellen')).toBeInTheDocument();
  });

  it('renders component according props', () => {
    renderComponent({ publicServices: mockStatePublicServices }, 'search');
    expect(screen.getByText('Neue Suchanfrage erstellen')).toBeInTheDocument();
  });

  it('renders all form elements', () => {
    renderComponent({ publicServices: mockStatePublicServices }, 'offer');
    expect(screen.getByLabelText('Kategorie')).toBeInTheDocument();
    expect(screen.getByLabelText('Sub Kategorie')).toBeInTheDocument();
    expect(screen.getByLabelText('Region / Kanton')).toBeInTheDocument();
    expect(screen.getByLabelText('Ort')).toBeInTheDocument();
    expect(screen.getByLabelText('Zusätzliche Informationen zum Standort (z.B Angabe Umkreis.)')).toBeInTheDocument();
    expect(screen.getByLabelText('Ort')).toBeInTheDocument();
    expect(screen.getByLabelText('Titel Angebot')).toBeInTheDocument();
    expect(screen.getByLabelText('Beschreibung')).toBeInTheDocument();
  });

  it('action to create public service is called with valid data', async () => {
    AuthService.checkAuth.mockResolvedValue(true);
    renderComponent({ publicServices: mockStatePublicServices }, 'offer');
    await waitFor(() => {
      fireEvent.mouseDown(screen.getByLabelText('Kategorie'));
    });
    await waitFor(() => {
      const option = screen.getByRole('option', { name: 'Handwerk' });
      fireEvent.click(option);
    });
    await waitFor(() => {
      fireEvent.mouseDown(screen.getByLabelText('Region / Kanton'));
    });
    await waitFor(() => {
      const option = screen.getByRole('option', { name: 'Zürich' });
      fireEvent.click(option);
    });
    fireEvent.change(screen.getByLabelText('Region / Kanton'), {
      target: { value: 'Zürich' },
    });
    fireEvent.change(screen.getByLabelText('Ort'), {
      target: { value: 'Zürich' },
    });
    fireEvent.change(screen.getByLabelText('Zusätzliche Informationen zum Standort (z.B Angabe Umkreis.)'), {
      target: { value: 'Umkreis 10km' },
    });
    fireEvent.change(screen.getByLabelText('Titel Angebot'), {
      target: { value: 'Elektriker Service' },
    });
    fireEvent.change(screen.getByLabelText('Beschreibung'), {
      target: { value: 'Biete Elektriker Service in Zürich an.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Erstellen' }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });

  it('shows validation errors for empty fields', async () => {
    renderComponent({ publicServices: mockStatePublicServices }, 'offer');
    fireEvent.click(screen.getByRole('button', { name: 'Erstellen' }));
    await waitFor(() => {
      expect(screen.getAllByText(/ist erforderlich/).length).toBeGreaterThan(0);
    });
  });

  it('shows loading state', () => {
    const loadingState = {
      ...mockStatePublicServices,
      publicServices: {
        loading: true,
      },
    };
    renderComponent({ publicServices: loadingState }, 'offer');
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows success modal', () => {
    const successState = {
      ...mockStatePublicServices,
      publicServices: {
        success: true,
      },
    };
    renderComponent({ publicServices: successState }, 'offer');
    expect(screen.getByText('Erfolgreich gespeichert. Vielen Dank für deinen Beitrag!')).toBeInTheDocument();
  });

  it('shows error modal on failure', () => {
    const errorState = {
      ...mockStatePublicServices,
      publicServices: {
        error: { status: 400, detail: 'Error' },
      },
    };
    renderComponent({ publicServices: errorState }, 'offer');
    expect(screen.getByText('Bitte überprüfe deine Eingaben.')).toBeInTheDocument();
  });
});
