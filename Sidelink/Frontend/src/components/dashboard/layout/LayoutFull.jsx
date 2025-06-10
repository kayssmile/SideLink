import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled, useTheme, useMediaQuery } from '@mui/material';
import { ScrollToTop } from 'src/components/shared/utils/utils';
import Sidebar from 'src/components/dashboard/shared/header/sidebar/Sidebar';
import Header from 'src/components/dashboard/shared/header/vertical/Header';
import InfoModal from 'src/components/shared/InfoModal';

const LayoutFull = () => {
  const theme = useTheme();
  const SidebarOpen = useSelector(state => state.dashboard.sidebar);
  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'));
  const xlUp = useMediaQuery(theme => theme.breakpoints.up('xl'));

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
    <SiteWrapper data-testid="layout-full">
      <Sidebar />

      <PageWrapper className="page-wrapper">
        <Header />

        <MainWrapper>
          <main>
            <ScrollToTop />
            <Outlet />
          </main>
        </MainWrapper>
      </PageWrapper>
      <InfoModal />
    </SiteWrapper>
  );
};

export default LayoutFull;
