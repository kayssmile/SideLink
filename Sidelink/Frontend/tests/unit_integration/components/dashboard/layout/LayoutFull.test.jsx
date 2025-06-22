import { render, screen } from '@testing-library/react';
import LayoutFull from 'src/components/dashboard/layout/LayoutFull';
import { darkTheme } from 'src/config/Theme.js';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';
import store from 'src/store/Store';
import { Provider } from 'react-redux';

window.scrollTo = vi.fn();

describe('LayoutFull Component', () => {
  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
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
});
