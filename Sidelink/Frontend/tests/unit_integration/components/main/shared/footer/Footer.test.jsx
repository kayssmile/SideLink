import { screen } from '@testing-library/react';
import renderWithProviders from '@tests/utils/RenderWithProviders';
import Footer from 'src/components/main/shared/footer/Footer';

const mockNavigate = vi.fn();
const mockUseLocation = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockUseLocation(),
  };
});

describe('Footer Component', () => {
  it('renders without crashing', () => {
    mockUseLocation.mockReturnValue({ pathname: '/home' });
    renderWithProviders(<Footer />);
    expect(screen.getByTestId('main-footer')).toBeInTheDocument();
  });

  it('renders all hard-coded content', () => {
    mockUseLocation.mockReturnValue({ pathname: '/home' });
    renderWithProviders(<Footer />);
    expect(screen.getByRole('heading', { name: /Sidelink/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/Follow us/i)).toBeInTheDocument();
    expect(screen.getByText(/Impressum/i)).toBeInTheDocument();
    expect(screen.getByText(/Datenschutz/i)).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /facebook/i })).toHaveAttribute('href', 'https://www.facebook.com/');
    expect(screen.getByRole('link', { name: /instagram/i })).toHaveAttribute('href', 'https://www.instagram.com/');
  });
});
