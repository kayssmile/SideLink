import { screen } from '@testing-library/react';

import renderWithProviders from '/testing/unit_integration/utils/RenderWithProviders.jsx';

import SidebarMenu from 'src/components/dashboard/shared/header/sidebar/parts/SidebarMenu';

vi.mock('src/config/NavigationConfigurations', () => ({
  sideBarMenuItems: [
    { navlabel: true, subheader: 'Mock Home' },
    {
      title: 'Mock Dienstleistung Verwaltung',
      icon: () => null,
      to: '',
      children: [
        { title: 'Mock Meine Angebote', icon: () => null, to: '/mock-services-offer' },
        { title: 'Mock Meine Suche', icon: () => null, to: '/mock-services-search' },
      ],
    },
    { title: 'Mock Öffentliches Profil', icon: () => null, to: '/mock-publicprofile' },
    { navlabel: true, subheader: 'Mock Einstellungen' },
    { title: 'Mock Account Verwaltung', icon: () => null, to: '/mock-account' },
  ],
}));

const renderSidebarComponent = () => {
  return renderWithProviders(<SidebarMenu />);
};

describe('SidebarMenu component', () => {
  it('renders the component', () => {
    renderSidebarComponent();
  });

  it('renders the component with mocked configuration', () => {
    renderSidebarComponent();
    expect(screen.getByText('Mock Home')).toBeInTheDocument();
    expect(screen.getByText('Mock Dienstleistung Verwaltung')).toBeInTheDocument();
    expect(screen.getByText('Mock Öffentliches Profil')).toBeInTheDocument();
    expect(screen.getByText('Mock Einstellungen')).toBeInTheDocument();
    expect(screen.getByText('Mock Account Verwaltung')).toBeInTheDocument();
  });
});
