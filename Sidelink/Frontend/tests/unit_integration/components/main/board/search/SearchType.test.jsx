import { screen, fireEvent, waitFor } from '@testing-library/react';
import SearchType from 'src/components/main/board/search/SearchType';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from 'src/config/Theme.js';
import { renderWithAllReducers } from '@tests/utils/RenderWithRedux';
import { publicServices as mockPublicServices } from '@tests/utils/MockData.js';
import { MemoryRouter } from 'react-router-dom';

const renderComponent = (preloadedState, url = '/board') => {
  return renderWithAllReducers(
    <ThemeProvider theme={darkTheme}>
      <MemoryRouter initialEntries={[url]}>
        <SearchType />
      </MemoryRouter>
    </ThemeProvider>,
    { preloadedState }
  );
};

describe('SearchType Component', () => {
  const mockStatePublicDataSuccess = {
    mobileSidebar: false,
    themeMode: 'dark',
    publicData: {
      searchEngineData: [],
      searchMask: {
        active: false,
        category: { type: 'category', data: false },
        subCategories: { type: 'subCategories', data: false },
        region: { type: 'region', data: false },
        serviceType: { type: 'type', data: false },
        text: { type: 'text', data: false },
      },
      publicServices: mockPublicServices,
      publicProfiles: { data: [], loading: false, success: false, error: false },
      loading: false,
      success: true,
      error: false,
      init: false,
    },
  };

  it('renders without crashing', () => {
    renderComponent({ publicData: mockStatePublicDataSuccess });
    expect(screen.getByText('Angebotstyp')).toBeInTheDocument();
  });

  it('sets search Mask according to selected type', async () => {
    const { store } = renderComponent({ publicData: mockStatePublicDataSuccess });
    await waitFor(() => {
      fireEvent.mouseDown(screen.getByLabelText('Angebotstyp'));
    });
    await waitFor(() => {
      const option = screen.getByRole('option', { name: 'Angebote' });
      fireEvent.click(option);
    });
    const state = store.getState();
    expect(state.publicData.publicData.searchMask.serviceType.data).toEqual('offer');
  });

  it('sets searchresults according to selected type', async () => {
    const { store } = renderComponent({ publicData: mockStatePublicDataSuccess });
    await waitFor(() => {
      fireEvent.mouseDown(screen.getByLabelText('Angebotstyp'));
    });
    await waitFor(() => {
      const option = screen.getByRole('option', { name: 'Suche' });
      fireEvent.click(option);
    });
    const state = store.getState();
    expect(state.publicData.publicData.searchEngineData).toEqual([]);
  });

  it('sets filter upon url parameter', () => {
    const url = '/board?type=search';
    renderComponent({ publicData: mockStatePublicDataSuccess }, url);
    expect(screen.getByText('Suche')).toBeInTheDocument();
  });
});
