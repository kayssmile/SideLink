import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Loading from 'src/components/shared/Loading';

/*
 * RouterGuard as wrapper for protected routes, initialstate null is used for loading-component
 */
const RouterGuard = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const dashboardData = useSelector(state => state.dashboard.dashboardData);

  useEffect(() => {
    if (dashboardData.user.email) {
      setIsLoggedIn(true);
    }
    if (dashboardData.loading) {
      setIsLoggedIn(null);
    }
    if (dashboardData.error) {
      setIsLoggedIn(false);
    }
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
