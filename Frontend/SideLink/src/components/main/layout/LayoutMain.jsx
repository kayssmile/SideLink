import { useTheme, Container } from '@mui/material';
import { styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { ScrollToTop } from 'src/components/shared/utils/utils';

import Header from 'src/components/main/shared/header/header';
import Footer from 'src/components/main/shared/footer/footer';

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
        <div>
          <Header />
          <Container maxWidth="xl">
            <main>
              <ScrollToTop />
              <Outlet />
            </main>
          </Container>
        </div>

        <Footer />
      </SiteWrapper>
    </>
  );
};

export default LayoutMain;
