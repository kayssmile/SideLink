import { render, screen } from '@testing-library/react';
import Navigations from 'src/components/main/shared/header/parts/Navigations';
import { MemoryRouter } from 'react-router-dom';
import { darkTheme } from 'src/config/Theme.js';
import { ThemeProvider } from '@emotion/react';

describe('Navigations Component', () => {
  const renderNavigationsComponent = () => {
    return render(
      <ThemeProvider theme={darkTheme}>
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
    expect(screen.getByText('Übersicht')).toBeInTheDocument();
    expect(screen.getByText('Anleitung')).toBeInTheDocument();
  });
});
