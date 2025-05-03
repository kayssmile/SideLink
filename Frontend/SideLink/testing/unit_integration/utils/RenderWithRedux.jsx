import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import userManagmentReducer from 'src/store/usermanagment/UserManagment';
import dashboardManagmentReducer from 'src/store/dashboard/main/DashboardManagment';

function renderWithUserReducer(ui, { preloadedState } = {}) {
  const store = configureStore({ reducer: { userManagment: userManagmentReducer }, preloadedState });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

function renderWithDashboardReducer(ui, { preloadedState } = {}) {
  const store = configureStore({ reducer: { dashboard: dashboardManagmentReducer }, preloadedState });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

export { renderWithUserReducer, renderWithDashboardReducer };
