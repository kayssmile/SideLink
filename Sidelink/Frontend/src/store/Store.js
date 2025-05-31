import { configureStore } from '@reduxjs/toolkit';

import userManagmentReducer from './usermanagment/UserManagment';
import dashboardManagmentReducer from './dashboard/main/DashboardManagment';
import publicProfileManagmentReducer from './dashboard/publicprofile/PublicProfileManagment';
import publicServicesManagmentReducer from './dashboard/publicservices/PublicServicesManagment';
import publicDataManagmentReducer from './publicdata/PublicDataManagment';

export const store = configureStore({
  reducer: {
    userManagment: userManagmentReducer,
    dashboard: dashboardManagmentReducer,
    publicProfile: publicProfileManagmentReducer,
    publicServices: publicServicesManagmentReducer,
    publicData: publicDataManagmentReducer,
  },
});

export default store;
