import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import userManagmentReducer from 'src/store/usermanagment/UserManagment';
import dashboardManagmentReducer from 'src/store/dashboard/main/DashboardManagment';
import publicProfileManagmentReducer from 'src/store/dashboard/publicprofile/PublicProfileManagment';
import publicServicesManagmentReducer from 'src/store/dashboard/publicservices/PublicServicesManagment';
import publicDataManagmentReducer from 'src/store/publicdata/PublicDataManagment';

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

function renderWithPublicDataReducer(ui, { preloadedState } = {}) {
  const store = configureStore({ reducer: { publicData: publicDataManagmentReducer }, preloadedState });
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

function renderWithAllReducers(ui, { preloadedState } = {}) {
  const store = configureStore({
    reducer: {
      publicData: publicDataManagmentReducer,
      userManagment: userManagmentReducer,
      dashboard: dashboardManagmentReducer,
      publicProfile: publicProfileManagmentReducer,
      publicServices: publicServicesManagmentReducer,
    },
    preloadedState,
  });
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

export { renderWithUserReducer, renderWithDashboardReducer, renderWithPublicDataReducer, renderWithAllReducers };
