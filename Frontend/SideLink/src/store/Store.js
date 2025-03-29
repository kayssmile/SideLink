import { configureStore } from '@reduxjs/toolkit';

import userManagmentReducer from './usermanagment/UserManagment';
import DashboardManagment from './dashboard/DashboardManagment';

export const store = configureStore({
  reducer: {
    userManagment: userManagmentReducer,
    dashboard: DashboardManagment,
  },
});

export default store;
