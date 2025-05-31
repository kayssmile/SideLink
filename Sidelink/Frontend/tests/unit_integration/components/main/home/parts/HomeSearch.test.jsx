import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import renderWithProviders from '@tests/utils/RenderWithProviders';
import HomeSearch from 'src/components/main/home/parts/HomeSearch';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('HomeSearch Component', () => {
  it('renders without crashing', () => {
    renderWithProviders(<HomeSearch />);
    expect(screen.getByRole('button', { name: /suche/i })).toBeInTheDocument();
  });

  it('updates the search input on typing', () => {
    renderWithProviders(<HomeSearch />);
    const input = screen.getByPlaceholderText(/Suche starten oder Angebot entdecken.../i);
    fireEvent.change(input, { target: { value: 'Webdesign' } });
    expect(input.value).toBe('Webdesign');
  });

  it('navigates on button click', () => {
    renderWithProviders(<HomeSearch />);
    const input = screen.getByPlaceholderText(/Suche starten oder Angebot entdecken.../i);
    const button = screen.getByRole('button', { name: /suche/i });
    fireEvent.change(input, { target: { value: 'Entwicklung' } });
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/board?search=Entwicklung');
  });

  it('navigates on Enter key press', () => {
    renderWithProviders(<HomeSearch />);
    const input = screen.getByPlaceholderText(/Suche starten oder Angebot entdecken.../i);
    fireEvent.change(input, { target: { value: 'Marketing' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockNavigate).toHaveBeenCalledWith('/board?search=Marketing');
  });

  it('does not navigate on empty input', () => {
    mockNavigate.mockClear();
    renderWithProviders(<HomeSearch />);
    const button = screen.getByRole('button', { name: /suche/i });
    const input = screen.getByPlaceholderText(/Suche starten oder Angebot entdecken.../i);
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
