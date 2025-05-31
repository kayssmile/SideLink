import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import renderWithProviders from '@tests/utils/RenderWithProviders';
import FooterLinks from 'src/components/main/shared/footer/parts/FooterLinks';

vi.mock('src/config/NavigationConfigurations', () => ({
  footerLinks: [
    {
      id: 1,
      elements: [
        {
          title: true,
          titleText: 'MockLinks',
        },
        {
          title: false,
          titleText: 'Mockboard',
          to: '/dashboard',
        },
        {
          title: false,
          titleText: 'MockHome',
          to: '/board/?category=Haushalt',
        },
      ],
    },
  ],
}));

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

describe('FooterLinks Component', () => {
  it('renders without crashing', () => {
    mockUseLocation.mockReturnValue({ pathname: '/home' });
    renderWithProviders(<FooterLinks />);
    expect(screen.getByText(/MockLinks/i)).toBeInTheDocument();
  });

  it('renders all footer links according mocklinks', () => {
    mockUseLocation.mockReturnValue({ pathname: '/home' });
    renderWithProviders(<FooterLinks />);
    expect(screen.getByText(/MockLinks/i)).toBeInTheDocument();
    expect(screen.getByText(/Mockboard/i)).toBeInTheDocument();
    expect(screen.getByText(/MockHome/i)).toBeInTheDocument();
  });

  it('renders links with correct hrefs', () => {
    mockUseLocation.mockReturnValue({ pathname: '/home' });
    renderWithProviders(<FooterLinks />);
    expect(screen.getByText(/Mockboard/i).closest('a')).toHaveAttribute('href', '/dashboard');
    expect(screen.getByText(/MockHome/i).closest('a')).toHaveAttribute('href', '/board/?category=Haushalt');
  });

  it('does not render category element as link on board page', () => {
    mockUseLocation.mockReturnValue({ pathname: '/board' });
    renderWithProviders(<FooterLinks />);
    const mockHomeElement = screen.getByText(/MockHome/i);
    expect(mockHomeElement.closest('a')).toBeNull();
  });
});
