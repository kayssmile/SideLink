import { useState } from 'react';
import { AppBar, Container, Drawer, IconButton, Stack, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { IconMenu2 } from '@tabler/icons-react';

import Logo from 'src/components/shared/logo/Logo';
import Navigations from './parts/Navigations';
import MobileSidebar from './parts/MobileSidebar';
import AccountMenu from './parts/AccountMenu';

const Header = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme => theme.breakpoints.up('md'));
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const toggleDrawer = newOpen => () => {
    setOpen(newOpen);
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
      <Container maxWidth="xl">
        <nav>
          <Toolbar
            sx={{
              width: '100%',
              paddingLeft: '0 !important',
              paddingRight: '0 !important',
              justifyContent: 'space-between',
            }}
          >
            <Logo />

            {mdUp ? (
              <>
                <Stack spacing={1} direction="row" alignItems="center" sx={{ maxWidth: '40%' }}>
                  <Navigations />
                </Stack>
                <AccountMenu mdUp={mdUp} />
              </>
            ) : (
              <IconButton color="inherit" aria-label="menu" onClick={handleDrawerOpen} data-testid="hamburger">
                <IconMenu2 size="30" />
              </IconButton>
            )}
          </Toolbar>
        </nav>
      </Container>

      <Drawer
        anchor="left"
        open={open}
        variant="temporary"
        onClose={toggleDrawer(false)}
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
