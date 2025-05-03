import { Outlet } from 'react-router-dom'; // Für das Einfügen von Kinder-Routen
import { useState, useEffect } from 'react';
import { styled, Container, Box, useTheme, useMediaQuery } from '@mui/material';

import Sidebar from 'src/components/dashboard/shared/header/sidebar/Sidebar';
import Header from 'src/components/dashboard/shared/header/vertical/Header';

//import { SiteWrapper, PageWrapper, MainWrapper } from 'src/components/main/styledelements/StyledElements';

import { useSelector, useDispatch } from 'react-redux';
//import getDashboardData from 'src/store/dashboard/actions/GetDashboardDataAction';
//import { checkAuth } from 'src/services/CheckAuth';

const LayoutFull = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const SidebarOpen = useSelector(state => state.dashboard.sidebar);

  //const toggleWidth = SidebarOpen ? '0 5%' : '0 15%';

  const dashboardData = useSelector(state => state.dashboard.dashboardData.success);

  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'));
  const xlUp = useMediaQuery(theme => theme.breakpoints.up('xl'));
  /*

  const token = localStorage.getItem('accessToken');
  dispatch(getDashboardData(token)); */

  useEffect(() => {
    /* 
    // id aus checkauth löschen da token signatur id enthält
    const setDashboardData = async () => {
      const { token, id } = await checkAuth();
      if (token && id) {
        dispatch(getDashboardData(token));
      }
    };

    if (!dashboardData) {
      setDashboardData();
    }  */
  }, [dispatch]);

  const SiteWrapper = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: theme.palette.background.main,
    maxWidth: mdDown && SidebarOpen ? '100vw' : 'auto',
    overflow: mdDown && SidebarOpen ? 'hidden' : 'auto',
  }));

  const PageWrapper = styled('div')(() => ({
    display: 'flex',
    flexGrow: 1,
    paddingBottom: '50px',
    flexDirection: 'column',
    zIndex: 1,
  }));

  const MainWrapper = styled('div')(() => ({
    padding: xlUp ? (SidebarOpen ? '0 5%' : '0 15%') : '0 16px',
    maxWidth: 'clamp(0px, calc(100vw - 32px), 1200px)',
    //maxhHeight: SidebarOpen ? (smDown ? '100vh' : '100%') : 'auto',
  }));

  return (
    <>
      {dashboardData ? (
        <SiteWrapper data-testid="layout-full">
          <Sidebar />
          {/*  */}
          <PageWrapper className="page-wrapper">
            <Header />

            <MainWrapper>
              <main>
                <Outlet />
              </main>
            </MainWrapper>
          </PageWrapper>
        </SiteWrapper>
      ) : (
        <p>....Loadingf</p>
      )}
    </>
  );
};

export default LayoutFull;
