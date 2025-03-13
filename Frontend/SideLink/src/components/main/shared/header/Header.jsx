import { useState } from 'react';

import { AppBar, Container, Drawer, IconButton, Stack, Toolbar, useMediaQuery } from '@mui/material';

import Logo from 'src/components/shared/logo/logo';
import Navigations from './parts/Navigations';
import MobileSidebar from './parts/MobileSidebar';
import { IconMenu2 } from '@tabler/icons-react';

import { useTheme } from '@mui/material/styles';

import AccountMenu from './parts/AccountMenu';

const Header = () => {
  const theme = useTheme();

  const mdUp = useMediaQuery(theme => theme.breakpoints.up('md'));
  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const toggleDrawer = newOpen => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        justifyContent: 'center',
        padding: '10px 0',
        backgroundColor: theme.palette.background.main,
      }}
    >
      <Container maxWidth="lg">
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

            {mdDown ? (
              <IconButton color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                <IconMenu2 size="30" />
              </IconButton>
            ) : null}
            {mdUp ? (
              <>
                <Stack spacing={1} direction="row" alignItems="center">
                  <Navigations />
                </Stack>

                <AccountMenu />
              </>
            ) : null}
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
