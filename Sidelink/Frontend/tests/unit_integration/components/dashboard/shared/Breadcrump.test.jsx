import { screen } from '@testing-library/react';

import renderWithProviders from '/tests/unit_integration/utils/RenderWithProviders.jsx';

import Breadcrumb from 'src/components/dashboard/shared/Breadcrumb';

const renderComponent = (subtitle, items, title) => {
  return renderWithProviders(<Breadcrumb subtitle={subtitle} items={items} title={title} />);
};

describe('Breadcrump Component', () => {
  it('renders the Component according to props', () => {
    renderComponent(
      'Subtitle',
      [
        {
          to: '/dashboard',
          title: 'Dashboard',
        },
        {
          title: 'Public Profile',
        },
      ],
      'Title'
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Public Profile')).toBeInTheDocument();
  });
});
