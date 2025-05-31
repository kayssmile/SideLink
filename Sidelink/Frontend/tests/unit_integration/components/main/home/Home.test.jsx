import { screen } from '@testing-library/react';
import renderWithProviders from '@tests/utils/RenderWithProviders';
import { likedCategories } from 'src/config/CategoriesConfigurations';
import Home from 'src/components/main/home/Home';

describe('Home Component', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Home />);
    expect(screen.getByTestId('home-component')).toBeInTheDocument();
  });

  it('renders the heading section', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Create\./i)).toBeInTheDocument();
    expect(screen.getByText(/Connect\./i)).toBeInTheDocument();
    expect(screen.getByText(/Complete\./i)).toBeInTheDocument();
  });

  it('renders the search component', () => {
    renderWithProviders(<Home />);
    expect(screen.getByRole('button', { name: /suche/i })).toBeInTheDocument();
  });

  it('renders the category heading', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Beliebte Kategorien/i)).toBeInTheDocument();
  });

  it('renders all liked categories', () => {
    renderWithProviders(<Home />);
    likedCategories.forEach(category => {
      expect(screen.getByText(category.title)).toBeInTheDocument();
    });
  });
});
