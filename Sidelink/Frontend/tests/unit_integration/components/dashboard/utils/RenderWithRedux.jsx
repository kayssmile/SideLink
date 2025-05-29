import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import dashboardManagmentReducer from 'src/store/dashboard/main/DashboardManagment';

export default function renderWithRedux(ui, { preloadedState } = {}) {
  const store = configureStore({ reducer: { dashboard: dashboardManagmentReducer }, preloadedState });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}
