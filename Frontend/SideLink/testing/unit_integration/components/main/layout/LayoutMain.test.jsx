import { render, screen } from '@testing-library/react';
import LayoutMain from 'src/components/main/layout/LayoutMain';
import { theme } from 'src/theme/theme.js';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';

describe('LayoutMain Component', () => {
  const renderComponent = () => {
    return render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <LayoutMain></LayoutMain>
        </MemoryRouter>
      </ThemeProvider>
    );
  };

  it('renders without crashing', () => {
    renderComponent();
    expect(screen.getByTestId('layout-main')).toBeInTheDocument();
  });

  it('renders the header component', () => {
    renderComponent();
    expect(screen.getByTestId('main-header')).toBeInTheDocument();
  });

  it('renders the footer component', () => {
    renderComponent();
    expect(screen.getByTestId('main-footer')).toBeInTheDocument();
  });
  /*
  it('matches snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  }); */
});
