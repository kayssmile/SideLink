import { IconButton, Box, AppBar, useMediaQuery, Toolbar, styled, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar, toggleThemeMode } from 'src/store/dashboard/DashboardManagment';
import { IconMenu2, IconMoon, IconSun } from '@tabler/icons-react';

import ProfileMenuDesktop from 'src/components/shared/header/ProfileMenuDesktop';

import { useTheme } from '@mui/material/styles';

const Header = () => {
  const theme = useTheme();

  //const lgUp = useMediaQuery(theme => theme.breakpoints.up('md'));
  //const lgDown = useMediaQuery(theme => theme.breakpoints.down('md'));

  const themeMode = useSelector(state => state.dashboard.themeMode);
  const dispatch = useDispatch();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    background: theme.palette.background.main,
    justifyContent: 'center',
  }));
  const ToolbarStyled = styled(Toolbar)(() => ({
    color: 'white',
    height: '85px',
  }));

  return (
    <AppBarStyled position="sticky" color="default" data-testid="dashboard-header">
      <ToolbarStyled>
        <IconButton color="inherit" aria-label="menu" onClick={() => dispatch(toggleSidebar())}>
          <IconMenu2 size="25" />
        </IconButton>

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {themeMode === 'light' ? (
            <IconButton size="large" color="inherit" onClick={() => dispatch(toggleThemeMode())}>
              <IconMoon size="25" stroke="1.5" />
            </IconButton>
          ) : (
            <IconButton size="large" color="inherit" onClick={() => dispatch(toggleThemeMode())}>
              <IconSun size="30" stroke="1.5" />
            </IconButton>
          )}

          <ProfileMenuDesktop />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
