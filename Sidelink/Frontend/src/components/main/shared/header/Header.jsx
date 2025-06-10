import { AppBar, Container, Drawer, IconButton, Stack, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { IconMenu2 } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMobileSidebar } from 'src/store/publicdata/PublicDataManagment';
import Logo from 'src/components/shared/logo/Logo';
import Navigations from './parts/Navigations';
import MobileSidebar from './parts/MobileSidebar';
import AccountMenu from './parts/AccountMenu';

const Header = () => {
  const theme = useTheme();
  const xlUp = useMediaQuery(theme => theme.breakpoints.up('xl'));
  const dispatch = useDispatch();
  const mobileSidebar = useSelector(state => state.publicData.mobileSidebar);

  const toggleDrawer = () => {
    dispatch(toggleMobileSidebar());
  };

  return (
    <AppBar
      data-testid="main-header"
      position="sticky"
      sx={{
        justifyContent: 'center',
        padding: '10px 0',
        backgroundColor: theme.palette.background.main,
      }}
    >
      <Container maxWidth="xl" component="nav">
        <Toolbar
          sx={{
            width: '100%',
            paddingLeft: '0 !important',
            paddingRight: '0 !important',
            justifyContent: 'space-between',
          }}
        >
          <Logo />

          {xlUp ? (
            <>
              <Stack component="ul" spacing={1} direction="row" alignItems="center" sx={{ maxWidth: '50%' }}>
                <Navigations />
              </Stack>
              <AccountMenu />
            </>
          ) : (
            <IconButton color="inherit" aria-label="menu" onClick={toggleDrawer} data-testid="hamburger">
              <IconMenu2 size="30" />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      <Drawer
        anchor="left"
        open={mobileSidebar}
        variant="temporary"
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 270,
            border: '0 !important',
            backgroundColor: theme.palette.background.main,
          },
        }}
      >
        <MobileSidebar />
      </Drawer>
    </AppBar>
  );
};

export default Header;
