import { render, screen } from '@testing-library/react';
import LayoutFull from 'src/components/dashboard/layout/LayoutFull';
import { theme } from 'src/theme/theme.js';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';
import store from 'src/store/store';
import { Provider } from 'react-redux';

describe('LayoutFull Component', () => {
  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <LayoutFull></LayoutFull>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
  };

  it('renders without crashing', () => {
    renderComponent();
    expect(screen.getByTestId('layout-full')).toBeInTheDocument();
  });

  it('renders the sidebar component', () => {
    renderComponent();
    expect(screen.getByTestId('dashboard-sidebar')).toBeInTheDocument();
  });

  it('renders the header component', () => {
    renderComponent();
    expect(screen.getByTestId('dashboard-header')).toBeInTheDocument();
  });

  /*
  it('renders content component', () => {
    renderComponent();
    expect(screen.getByTestId('main-footer')).toBeInTheDocument();
  }); 

  it('matches snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  }); */
});
