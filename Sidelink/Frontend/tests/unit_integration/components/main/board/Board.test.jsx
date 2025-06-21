import { screen } from '@testing-library/react';
import Board from 'src/components/main/board/Board';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from 'src/config/Theme.js';
import { renderWithAllReducers } from '@tests/utils/RenderWithRedux';
import { publicServices as mockPublicServices } from '@tests/utils/MockData.js';
import { MemoryRouter } from 'react-router-dom';

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => '',
  }),
});
window.scrollTo = vi.fn();

const renderComponent = (preloadedState, url) => {
  return renderWithAllReducers(
    <ThemeProvider theme={darkTheme}>
      <MemoryRouter initialEntries={[url]}>
        <Board />
      </MemoryRouter>
    </ThemeProvider>,
    { preloadedState }
  );
};

describe('Board Component', () => {
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

  const mockStateDashboardData = {
    dashboardData: {
      user: { email: 'test@admin.ch' },
      publicProfile: {},
      publicServices: {},
      success: false,
      error: false,
      loading: false,
    },
  };

  it('renders without crashing', () => {
    renderComponent({ publicData: mockStatePublicDataSuccess, dashboard: mockStateDashboardData }, '/board');
    expect(screen.getByText('Hier findest du was du suchst.')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    const mockStateLoading = {
      publicData: {
        ...mockStatePublicDataSuccess.publicData,
        loading: true,
      },
    };
    renderComponent({ publicData: mockStateLoading }, '/board');
    const loader = screen.getByRole('progressbar');
    expect(loader).toBeInTheDocument();
  });

  it('renders error state', () => {
    const mockStateError = {
      publicData: {
        ...mockStatePublicDataSuccess.publicData,
        error: true,
      },
    };
    renderComponent({ publicData: mockStateError }, '/board');
    expect(screen.getByText(/Technische Störungen/i)).toBeInTheDocument();
  });

  it('sets serch engine data with no filters', () => {
    const mockStatePublicDataInit = {
      ...mockStatePublicDataSuccess,
      loading: false,
      success: false,
      error: false,
      init: true,
    };
    const { store } = renderComponent({ publicData: mockStatePublicDataInit, dashboard: mockStateDashboardData }, '/board');
    const state = store.getState();
    expect(state.publicData.publicData.searchEngineData).toEqual(mockPublicServices);
  });

  it('sets search engine upon data with url filters', () => {
    const mockStatePublicDataInit = {
      ...mockStatePublicDataSuccess,
      loading: false,
      success: false,
      error: false,
      init: true,
    };
    const { store } = renderComponent({ publicData: mockStatePublicDataInit, dashboard: mockStateDashboardData }, '/board?category=Handwerk&type=offer');
    const state = store.getState();
    expect(state.publicData.publicData.searchEngineData).toEqual([]);
  });

  it('sets search engine data with valid url filters', () => {
    const mockStatePublicDataInit = {
      ...mockStatePublicDataSuccess,
      loading: false,
      success: false,
      error: false,
      init: true,
    };
    const { store } = renderComponent({ publicData: mockStatePublicDataInit, dashboard: mockStateDashboardData }, '/board?type=search');
    const state = store.getState();
    expect(state.publicData.publicData.searchEngineData.length).toEqual(0);
  });
});
