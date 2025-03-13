import { configureStore } from '@reduxjs/toolkit';

import AccountManagement from './authorisation/AccountManagement';
import DashboardManagment from './dashboard/DashboardManagment';

export const store = configureStore({
  reducer: {
    account: AccountManagement,
    dashboard: DashboardManagment,
  },
});

export default store;
