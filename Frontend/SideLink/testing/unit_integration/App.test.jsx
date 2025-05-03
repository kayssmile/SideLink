import App from 'src/App';
import renderWithRedux from '/testing/utility/RenderWithRedux';
import { MemoryRouter } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';

const renderApp = preloadedState => {
  return renderWithRedux(<App />, { preloadedState });
};

describe('App', () => {
  const mockStateLoggedOut = {
    loading: false,
    userInfo: null,
    error: null,
    success: false,
  };

  it('renders without crashing', async () => {
    renderApp({ userManagment: mockStateLoggedOut });
    await waitFor(
      () => {
        expect(screen.getByText('Sidelink')).toBeInTheDocument();
        expect(screen.getByTestId('home-component')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });
});
