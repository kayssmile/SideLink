import { axiosInstanceBasicAuth } from 'src/api/AxiosInstance';
import { getRefreshToken, removeToken, removeRefreshToken } from 'src/components/shared/utils/TokenUtils';
import { dashboardLogout } from 'src/store/dashboard/main/DashboardManagment';
import { userLogout } from 'src/store/usermanagment/UserManagment';

export const logoutService = async ({ dispatch, navigate }) => {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    try {
      await axiosInstanceBasicAuth.post('/api/auth/logout/', { refresh: refreshToken });
    } catch (error) {
      console.error('Logout: Token invalidation failed', error);
    }
  }
  removeToken();
  removeRefreshToken();
  dispatch(userLogout());
  dispatch(dashboardLogout());
  navigate('/home');
};
