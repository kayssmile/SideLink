import { screen, fireEvent } from '@testing-library/react';
import renderWithProviders from '/tests/unit_integration/utils/RenderWithProviders.jsx';
import NavCollapse from 'src/components/dashboard/shared/header/sidebar/parts/NavCollapse';

const mockMenu = {
  title: 'Mock Dienstleistung Verwaltung',
  icon: () => null,
  to: '',
  children: [
    { title: 'Mock Meine Angebote', icon: () => null, to: '/mock-services-offer' },
    { title: 'Mock Meine Suche', icon: () => null, to: '/mock-services-search' },
  ],
};

const renderNavCollapseComponent = (menu, level) => {
  return renderWithProviders(<NavCollapse menu={menu} level={level} />);
};

describe('NavCollapse component', () => {
  it('renders the component with mocked configuration', () => {
    renderNavCollapseComponent(mockMenu, 1);
    expect(screen.getByText('Mock Dienstleistung Verwaltung')).toBeInTheDocument();
  });

  it('toggles the collapse on click', () => {
    renderNavCollapseComponent(mockMenu, 1);
    const listItem = screen.getByText('Mock Dienstleistung Verwaltung').closest('li');
    fireEvent.click(listItem);
    expect(screen.getByText('Mock Meine Angebote')).toBeInTheDocument();
    expect(screen.getByText('Mock Meine Suche')).toBeInTheDocument();
  });
});
