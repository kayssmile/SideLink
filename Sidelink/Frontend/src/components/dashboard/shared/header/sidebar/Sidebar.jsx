import { useMediaQuery, Box, Drawer, useTheme, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { IconX } from '@tabler/icons-react';
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
        transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
        flexShrink: 0,
      }}
    >
      <Drawer
        anchor="left"
        variant={mdDown ? 'temporary' : 'persistent'}
        open={SidebarOpen}
        onClose={() => dispatch(toggleSidebar())}
        sx={{
          backgroundColor: theme.palette.background.main,
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: toggleWidth, backgroundColor: 'inherit', flexShrink: 0 },
        }}
      >
        <Box
          component="nav"
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
            <Box px={{ xs: 3, sm: 3 }} py={3} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Logo />

              <IconButton
                sx={{ display: mdDown ? 'inline-block' : 'none', color: theme => theme.palette.colors.white, marginTop: '-45px', marginRight: '10px' }}
                onClick={() => dispatch(toggleSidebar())}
                aria-label="toggle sidebar"
              >
                <IconX size="30" />
              </IconButton>
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
