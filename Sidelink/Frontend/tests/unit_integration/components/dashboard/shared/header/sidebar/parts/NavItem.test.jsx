import { screen } from '@testing-library/react';
import renderWithProviders from '/tests/unit_integration/utils/RenderWithProviders.jsx';
import NavItem from 'src/components/dashboard/shared/header/sidebar/parts/NavItem';

const renderNavItemComponent = (item, level) => {
  return renderWithProviders(<NavItem item={item} level={level} />);
};

describe('NavItem component', () => {
  it('renders the component with mocked configuration', () => {
    const item = {
      title: 'Mock Home',
      icon: () => null,
      to: '/mock-home',
    };
    const level = 0;
    renderNavItemComponent(item, level);
    expect(screen.getByText('Mock Home')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/mock-home');
  });
});
