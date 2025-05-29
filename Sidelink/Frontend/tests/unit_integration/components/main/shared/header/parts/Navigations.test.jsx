import { render, screen } from '@testing-library/react';
import Navigations from 'src/components/main/shared/header/parts/Navigations';
import { MemoryRouter } from 'react-router-dom';
import { theme } from 'src/theme/theme.js';
import { ThemeProvider } from '@emotion/react';

describe('Navigations Component', () => {
  const renderNavigationsComponent = () => {
    return render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Navigations />
        </MemoryRouter>
      </ThemeProvider>
    );
  };

  it('renders without crashing', () => {
    renderNavigationsComponent();
  });

  it('contains navigationelements', () => {
    renderNavigationsComponent();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Board')).toBeInTheDocument();
    expect(screen.getByText('Anleitung')).toBeInTheDocument();
  });
});
