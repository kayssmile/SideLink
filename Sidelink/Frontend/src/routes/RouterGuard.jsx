import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { checkAuth } from 'src/services/AuthService';
import { removeToken, removeRefreshToken } from 'src/components/shared/utils/TokenUtils';
import { userLogout } from 'src/store/usermanagment/UserManagment';
import { dashboardLogout } from 'src/store/dashboard/main/DashboardManagment';
import Loading from 'src/components/shared/Loading';

/*
 * RouterGuard as wrapper for protected routes, initialstate null is used to indicate loading
 */
const RouterGuard = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const result = await checkAuth();
        setIsLoggedIn(result);
        if (!result) {
          removeToken();
          removeRefreshToken();
          dispatch(userLogout());
          dispatch(dashboardLogout());
        }
      } catch (error) {
        console.error(error);
        setIsLoggedIn(false);
      }
    };
    checkAuthorization();
  }, [dispatch]);

  if (isLoggedIn === null) {
    return <Loading />;
  }

  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/home" replace />;
  }
};

export default RouterGuard;
