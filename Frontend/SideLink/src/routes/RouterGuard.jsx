import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { checkAuth } from 'src/services/AuthService';
import getDashboardData from 'src/store/dashboard/shared/actions/GetDashboardDataAction';

const RouterGuard = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // `null` steht für den Ladezustand
  const dashboardData = useSelector(state => state.dashboard.dashboardData);
  // const { dashboardData } = useSelector(state => state.dashboard);
  const dispatch = useDispatch();

  // useEffect, um den Auth-Status zu prüfen
  useEffect(() => {
    if (dashboardData.user.email) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [dashboardData]);

  if (isLoggedIn === null) {
    // Ladezustand: Vielleicht ein Spinner oder ähnliches anzeigen
    return <div>Loading...</div>;
  }

  if (isLoggedIn) {
    return children; // Wenn der User eingeloggt ist, zeige die geschützte Seite
  } else {
    return <Navigate to="/home" replace />; // Wenn nicht eingeloggt, zum Home weiterleiten
  }
};

export default RouterGuard;
