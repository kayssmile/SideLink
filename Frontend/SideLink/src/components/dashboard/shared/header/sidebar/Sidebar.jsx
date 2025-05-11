import { useMediaQuery, Box, Drawer, useTheme, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { IconCircleDashedX } from '@tabler/icons-react';

import { toggleSidebar } from 'src/store/dashboard/main/DashboardManagment';

import SidebarMenu from './parts/SidebarMenu';
import Logo from 'src/components/shared/logo/Logo';
import Logout from 'src/components/shared/header/Logout';

const Sidebar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'));
  const lgDown = useMediaQuery(theme => theme.breakpoints.down('lg'));
  const SidebarOpen = useSelector(state => state.dashboard.sidebar);
  const toggleWidth = SidebarOpen ? (lgDown ? 300 : 400) : 0;

  return (
    <Box
      data-testid="dashboard-sidebar"
      sx={{
        width: toggleWidth,
        position: 'relative',
        transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms', // 'width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms'
        flexShrink: 0,
      }}
    >
      <Drawer
        anchor="left"
        variant={mdDown ? 'temporary' : 'persistent'}
        open={SidebarOpen}
        onClose={() => dispatch(toggleSidebar())}
        sx={{
          backgroundColor: theme.palette.colors.main,
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: toggleWidth, backgroundColor: 'inherit', flexShrink: 0 },
        }}
      >
        <Box
          sx={{
            color: 'white',
            height: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Box px={3} py={3} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Logo />
              {mdDown ? (
                <IconButton color="inherit" aria-label="menu" onClick={() => dispatch(toggleSidebar())}>
                  <IconCircleDashedX size="25" />
                </IconButton>
              ) : null}
            </Box>

            <SidebarMenu />
          </Box>

          <Logout usage="sidebar" />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
