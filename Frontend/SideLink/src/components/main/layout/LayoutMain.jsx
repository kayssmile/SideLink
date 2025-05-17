import { useTheme, Container, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { ScrollToTop } from 'src/components/shared/utils/Utils';

import Header from 'src/components/main/shared/header/Header';
import Footer from 'src/components/main/shared/footer/Footer';
import InfoModal from 'src/components/shared/InfoModal';

const LayoutMain = () => {
  const theme = useTheme();

  const SiteWrapper = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: theme.palette.background.main,
  }));

  return (
    <>
      <SiteWrapper data-testid="layout-main">
        <Header />

        <Container maxWidth="xl" component="main">
          <ScrollToTop />
          <Outlet />
        </Container>

        <Footer />
        <InfoModal />
      </SiteWrapper>
    </>
  );
};

export default LayoutMain;
