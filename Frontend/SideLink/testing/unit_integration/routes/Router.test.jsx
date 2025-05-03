// testing/routes/Router.test.jsx
import { describe, it, expect } from 'vitest';
import { screen, waitFor, render } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from 'src/config/Theme';
import routes from 'src/routes/router';

// Optional: Lazy-Komponenten mocken, damit sie schnell laden
vi.mock('src/components/main/home', () => ({ default: () => <div>Home Page</div> }));
vi.mock('src/components/main/board', () => ({ default: () => <div>Board Page</div> }));
vi.mock('src/components/main/layout/layoutmain', () => ({
  default: ({ children }) => <div>Layout: {children}</div>,
}));

describe('App Router', () => {
  it('renders Home page on /home route', async () => {
    const router = createMemoryRouter(routes.routes, {
      initialEntries: ['/home'],
    });

    render(
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    );

    await waitFor(
      () => {
        expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it('redirects / to /home', async () => {
    const router = createMemoryRouter(routes.routes, {
      initialEntries: ['/'],
    });

    render(
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
    });
  });
});
