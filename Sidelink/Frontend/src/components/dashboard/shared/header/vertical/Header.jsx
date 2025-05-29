import { IconButton, Box, AppBar, Toolbar, styled, Stack } from '@mui/material';
import { IconMenu2, IconMoon, IconSun } from '@tabler/icons-react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleSidebar } from 'src/store/dashboard/main/DashboardManagment';
import { setThemeMode } from 'src/store/publicdata/PublicDataManagment';

import ProfileMenu from 'src/components/shared/header/ProfileMenu';

const Header = () => {
  const themeMode = useSelector(state => state.publicdata.themeMode);
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
        <IconButton color="inherit" data-testid="dashboard-header-hamburger" aria-label="menu" onClick={() => dispatch(toggleSidebar())}>
          <IconMenu2 size="25" />
        </IconButton>

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {themeMode === 'light' ? (
            <IconButton size="large" color="inherit" onClick={() => dispatch(setThemeMode('dark'))}>
              <IconMoon size="25" stroke="1.5" />
            </IconButton>
          ) : (
            <IconButton size="large" color="inherit" onClick={() => dispatch(setThemeMode('light'))}>
              <IconSun size="30" stroke="1.5" />
            </IconButton>
          )}

          <ProfileMenu />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
