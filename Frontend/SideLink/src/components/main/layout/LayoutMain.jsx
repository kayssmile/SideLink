import { Outlet, Link } from 'react-router-dom'; // Für das Einfügen von Kinder-Routen
import Header from 'src/components/main/shared/header/header';
import Footer from 'src/components/main/shared/footer/footer';
import Container from '@mui/material/Container';
import { styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const LayoutMain = () => {
  const theme = useTheme();
  const MainWrapper = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: theme.palette.background.main,
  }));

  return (
    <>
      <MainWrapper>
        <div>
          <Header />
          <Container maxWidth="lg">
            <main>
              <Outlet />
            </main>
          </Container>
        </div>

        <Footer />
      </MainWrapper>
    </>
  );
};

export default LayoutMain;
