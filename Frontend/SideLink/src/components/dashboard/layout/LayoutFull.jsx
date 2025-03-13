import { Outlet } from 'react-router-dom'; // Für das Einfügen von Kinder-Routen

import { styled, Container, Box, useTheme } from '@mui/material';
//import { useSelector } from 'react-redux';
//import { Outlet } from 'react-router';
//import Header from './vertical/header/Header';
//import HorizontalHeader from '../full/horizontal/header/Header';

//import Customizer from './shared/customizer/Customizer';
//import Navigation from './horizontal/navbar/Navbar';
//import ScrollToTop from '../../components/shared/ScrollToTop';
//import LoadingBar from '../../LoadingBar';

import Sidebar from 'src/components/dashboard/shared/header/sidebar/Sidebar';
import Header from 'src/components/dashboard/shared/header/vertical/Header';

const LayoutFull = () => {
  //const theme = useTheme();

  const MainWrapper = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100vh',
    width: '100%',
  }));

  const PageWrapper = styled('div')(() => ({
    display: 'flex',
    flexGrow: 1,
    paddingBottom: '60px',
    flexDirection: 'column',
    zIndex: 1,
    //width: '100%',
    backgroundColor: 'transparent',
  }));

  return (
    <>
      <MainWrapper className="main-wrapper">
        <Sidebar />

        <PageWrapper className="page-wrapper" sx={{}}>
          <Header />

          <main>
            <Outlet />
          </main>
        </PageWrapper>
      </MainWrapper>
    </>
  );
};

export default LayoutFull;
