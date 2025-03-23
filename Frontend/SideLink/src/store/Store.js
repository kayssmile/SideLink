import { configureStore } from '@reduxjs/toolkit';

import accountManagmentReducer from './usermanagment/AccountManagment';
import DashboardManagment from './dashboard/DashboardManagment';

export const store = configureStore({
  reducer: {
    accountManagment: accountManagmentReducer,
    dashboard: DashboardManagment,
  },
});

export default store;
