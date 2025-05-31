import { screen } from '@testing-library/react';
import renderWithProviders from '@tests/utils/RenderWithProviders';
import Heading from 'src/components/main/shared/Heading';

describe('CategoryItem Component', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Heading titleKey1="Test1" titleKey2="Test2" titleKey3="test3" subTitle="subTest" />);
    expect(screen.getByRole('heading', { name: /Test1/i, level: 1 })).toBeInTheDocument();
  });

  it('renders correct accordingly to test props', () => {
    renderWithProviders(<Heading titleKey1="Test1" titleKey2="Test2" titleKey3="test3" subTitle="subTest" />);
    expect(screen.getByRole('heading', { name: /Test1/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Test2/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Test3/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/subTest/i)).toBeInTheDocument();
  });
});
