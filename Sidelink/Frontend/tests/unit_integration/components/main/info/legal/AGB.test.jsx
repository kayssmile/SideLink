import { screen, render } from '@testing-library/react';
import AGB from 'src/components/main/info/legal/AGB.jsx';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from 'src/config/Theme.js';

const renderComponent = () => {
  return render(
    <ThemeProvider theme={darkTheme}>
      <AGB />
    </ThemeProvider>
  );
};

describe('AGB component', () => {
  it('renders without crashing', () => {
    renderComponent();
    expect(screen.getByText('Allgemeine Geschäftsbedingungen')).toBeInTheDocument();
  });

  it('renders some content of AGB', () => {
    renderComponent();
    expect(
      screen.getByRole('link', {
        name: '2. Allgemeine Bestimmungen zur Nutzung von Sidelink.ch',
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: '3. Gegenstand des Nutzungsvertrags',
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: '4. Registrierung auf Sidelink.ch',
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: '8. Abgabe von Angeboten',
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: '9. Versicherung',
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: '12. Bewertungen',
      })
    ).toBeInTheDocument();
  });
});
