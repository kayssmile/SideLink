import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Loading from 'src/components/shared/Loading';

/*
 * RouterGuard as wrapper for protected routes, initialstate null is used to indicate loading
 */
const RouterGuard = ({ children }) => {
  const [init, setInit] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const dashboardData = useSelector(state => state.dashboard.dashboardData);

  useEffect(() => {
    console.log('RouterGuard useEffect', dashboardData);
    if (dashboardData.user.email) {
      setIsLoggedIn(true);
    }
    if (dashboardData.error) {
      setIsLoggedIn(false);
    }
    if (!dashboardData.loading && !dashboardData.success && !dashboardData.error && !init) {
      console.log('here we set is logged out');
      setIsLoggedIn(false);
    }
    setInit(false);
  }, [dashboardData]);

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
