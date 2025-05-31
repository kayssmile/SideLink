import { screen } from '@testing-library/react';
import renderWithProviders from '@tests/utils/RenderWithProviders';
import CategoryItem from 'src/components/main/home/parts/CategoryItem';

describe('CategoryItem Component', () => {
  it('renders without crashing', () => {
    renderWithProviders(<CategoryItem urlParam="testCat" imgSrc="/root/test/ui.jpg" title="testTitle" imgDesc="testDesc" />);
    expect(screen.getByRole('heading', { name: /testTitle/i, level: 4 })).toBeInTheDocument();
  });

  it('renders correct accordingly to test props', () => {
    renderWithProviders(<CategoryItem urlParam="testCat" imgSrc="/root/test/ui.jpg" title="testTitle" imgDesc="testDesc" />);
    expect(screen.getByRole('heading', { name: /testTitle/i, level: 4 })).toBeInTheDocument();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/board?category=testCat');
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/root/test/ui.jpg');
    expect(img).toHaveAttribute('alt', 'testDesc');
  });
});
