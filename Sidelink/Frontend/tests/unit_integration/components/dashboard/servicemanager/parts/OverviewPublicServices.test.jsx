import { screen } from '@testing-library/react';
import OverviewPublicServices from 'src/components/dashboard/servicemanager/parts/OverviewPublicServices';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from 'src/config/Theme.js';
import { renderWithAllReducers } from '@tests/utils/RenderWithRedux';
import { publicServices } from '@tests/utils/MockData';

const renderComponent = (preloadedState, service_type) => {
  return renderWithAllReducers(
    <ThemeProvider theme={darkTheme}>
      <OverviewPublicServices type={service_type} />
    </ThemeProvider>,
    { preloadedState }
  );
};

describe('Create overview-public-services component', () => {
  const mockStatePublicServices = {
    publicServices: {
      data: publicServices,
      success: false,
      error: false,
      loading: false,
    },
  };

  it('renders without crashing', () => {
    renderComponent({ publicServices: mockStatePublicServices }, 'offer');
    expect(screen.getByText('Dienstleistungen Deine Angebote')).toBeInTheDocument();
  });

  it('renders component according props', () => {
    renderComponent({ publicServices: mockStatePublicServices }, 'search');
    expect(screen.getByText('Dienstleistungen Deine Suche')).toBeInTheDocument();
  });
  it('shows message with no services', () => {
    renderComponent({ publicServices: { ...mockStatePublicServices.publicServices, data: [] } }, 'offer');
    expect(screen.getByText('Keine Angebote vorhanden')).toBeInTheDocument();
  });

  it('renders all public services according to type', () => {
    renderComponent({ publicServices: mockStatePublicServices }, 'search');
    expect(screen.getByText('Keine Suche vorhanden')).toBeInTheDocument();
    renderComponent({ publicServices: mockStatePublicServices }, 'offer');
    expect(screen.getByText('IT Support')).toBeInTheDocument();
    expect(screen.getByText('Umzugshilfe')).toBeInTheDocument();
  });
});
