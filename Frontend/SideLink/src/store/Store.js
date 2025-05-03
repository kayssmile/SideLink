import { configureStore } from '@reduxjs/toolkit';

import userManagmentReducer from './usermanagment/UserManagment';
import dashboardManagmentReducer from './dashboard/main/DashboardManagment';
import publicProfileManagmentReducer from './dashboard/publicprofile/PublicProfileManagment';
import publicServicesManagment from './dashboard/publicservices/PublicServicesManagment';
import publicDataManagment from './publicdata/PublicDataManagment';

export const store = configureStore({
  reducer: {
    userManagment: userManagmentReducer,
    dashboard: dashboardManagmentReducer,
    publicprofile: publicProfileManagmentReducer,
    publicservices: publicServicesManagment,
    publicdata: publicDataManagment,
  },
});

export default store;
