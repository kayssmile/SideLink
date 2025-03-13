import { useMediaQuery, Box, Drawer, useTheme } from '@mui/material';
import SidebarItems from './SidebarItems';
import Logo from 'src/components/shared/logo/logo';

import { useSelector, useDispatch } from 'react-redux';

import { Logout } from './Logout';

const Sidebar = () => {
  const theme = useTheme();

  //const lgUp = useMediaQuery(theme => theme.breakpoints.up('lg'));

  const SidebarOpen = useSelector(state => state.dashboard.sidebar);
  //const dispatch = useDispatch();

  const toggleWidth = SidebarOpen ? 400 : 0;

  return (
    <Box
      sx={{
        width: toggleWidth,
        position: 'relative',
        transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
      }}
    >
      <Drawer
        anchor="left"
        variant="persistent"
        open={SidebarOpen}
        sx={{
          backgroundColor: theme.palette.colors.main,
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '400px', backgroundColor: 'inherit' },
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
            <Box px={3} py={3}>
              <Logo />
            </Box>

            <SidebarItems />
          </Box>

          <Logout />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
