import { render, screen, fireEvent } from '@testing-library/react';
import Board from 'src/components/main/board/Board';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from 'src/config/Theme.js';
import { renderWithPublicDataReducer } from '@tests/utils/RenderWithRedux';
import { renderWithAllReducers } from '@tests/utils/RenderWithRedux';

import { publicServices as mockPublicServices } from '@tests/utils/MockData.js';
import { MemoryRouter } from 'react-router-dom';

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
    const { store } = renderComponent({ publicData: mockStatePublicDataInit, dashboard: mockStateDashboardData }, '/board?type=offer');
    const state = store.getState();
    console.log('state', state.publicData.publicData.searchEngineData);
    //expect(state.publicData.publicData.searchEngineData.length).toEqual(1);
  });

  /*
  const mockNavigate = vi.fn();
  const mockUseLocation = vi.fn(() => ({
    pathname: "/suche",
    search: "?kategorie=design&region=berlin",
    hash: "",
    state: null,
    key: "test-key"
  }));
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockUseLocation(),
  };
});

it ('renders search results based on URL params', () => {
  const mockStateWithSearchResults = {
    publicData: {
      ...mockStatePublicDataSuccess.publicData,
      searchEngineData: mockPublicServices,
    },
  };
  

  
  it('renders all childcomponents', () => {
    renderComponent({ publicData: mockStatePublicData });
    expect(screen.getByAltText('Hier findest du was du suchst.')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('hamburger')).toBeInTheDocument();
  });

  it('opens sidebar on click to hamburger', () => {
    renderWithAllReducers(
      <ThemeProvider theme={darkTheme}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>,
      { publicData: mockStatePublicData, dashboard: mockStateDashboardData }
    );
    const hamburger = screen.getByTestId('hamburger');
    fireEvent.click(hamburger);
    expect(screen.getByTestId('sentinelStart')).toBeInTheDocument();
  }); */
});
