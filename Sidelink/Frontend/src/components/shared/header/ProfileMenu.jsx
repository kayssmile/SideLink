import { useState } from 'react';
import { Box, Menu, Typography, Divider, Button, useTheme, useMediaQuery } from '@mui/material';
import { IconChevronDown, IconChevronUp, IconMail } from '@tabler/icons-react';
import { Stack } from '@mui/system';
import { useSelector } from 'react-redux';
import { profileMenu as profileMenuConfiguration } from 'src/config/NavigationConfigurations';
import Logout from 'src/components/shared/header/Logout';
import MenuItem from './parts/MenuItem';

const ProfileMenu = () => {
  const themeMode = useSelector(state => state.publicData.themeMode);
  const theme = useTheme();
  const xbs = useMediaQuery(theme.breakpoints.down('xbs'));

  const { dashboardData } = useSelector(state => state.dashboard);
  const [profileMenu, setProfileMenu] = useState(false);

  const handleProfileMenu = event => {
    setProfileMenu(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setProfileMenu(null);
  };

  return (
    <>
      <Button size="large" color="inherit" aria-controls="msgs-menu" aria-haspopup="true" onClick={handleProfileMenu}>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{ color: themeMode === 'dark' ? 'white' : 'yellow', fontWeight: 600, marginRight: 2, fontSize: { xs: '0.8rem', sm: '0.9rem' }, maxWidth: '300px' }}
        >
          {`Guten Tag, ${dashboardData.user?.first_name} ${dashboardData.user?.last_name}`}
        </Typography>

        {profileMenu ? <IconChevronUp size={xbs ? '3rem' : '2rem'} /> : <IconChevronDown size={xbs ? '3rem' : '2rem'} />}
      </Button>

      <Menu
        id="msgs-menu"
        anchorEl={profileMenu}
        keepMounted
        open={Boolean(profileMenu)}
        onClose={handleCloseProfileMenu}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
            padding: '1rem',
          },
        }}
      >
        <Stack direction="row" component="li" key="user-info" pb={3} spacing={2} alignItems="center">
          <Box component="aside">
            <Typography variant="subtitle1" color="textSecondary" fontWeight={600}>
              {dashboardData.user?.first_name} {dashboardData.user?.last_name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {dashboardData.user?.profession}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" display="flex" alignItems="center" gap={1}>
              <IconMail width={15} height={15} />
              {dashboardData.user?.email}
            </Typography>
          </Box>
        </Stack>

        <Divider />
        {profileMenuConfiguration.map(menuItem => (
          <li key={menuItem.title}>
            <MenuItem menuItem={menuItem} />
          </li>
        ))}
        <Box component="li" key="logout">
          <Logout usage="profilemenu" />
        </Box>
      </Menu>
    </>
  );
};

export default ProfileMenu;
