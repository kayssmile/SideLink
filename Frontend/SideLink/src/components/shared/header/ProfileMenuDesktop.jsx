import { useState } from 'react';
import { Box, Menu, Typography, Divider, Button, useTheme } from '@mui/material';
import { IconChevronDown, IconChevronUp, IconMail } from '@tabler/icons-react';
import { Stack } from '@mui/system';
import { useSelector } from 'react-redux';

import { profileMenu as profileMenuConfiguration } from 'src/config/NavigationConfigurations';

import Logout from 'src/components/shared/header/Logout';
import MenuItem from './parts/MenuItem';

const ProfileMenuDesktop = () => {
  const theme = useTheme();
  //const userInfo = useSelector(state => state.userManagment.userInfo);
  const { dashboardData } = useSelector(state => state.dashboard);
  const [profileMenu, setProfileMenu] = useState(false);

  const handleProfileMenu = event => {
    setProfileMenu(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setProfileMenu(null);
  };

  return (
    <Box>
      <Button size="large" color="inherit" aria-controls="msgs-menu" aria-haspopup="true" onClick={handleProfileMenu}>
        <Typography variant="subtitle2" color="white" fontWeight={600} mr={2}>
          {`Guten Tag, ${dashboardData.user?.first_name} ${dashboardData.user?.last_name}`}
        </Typography>

        {profileMenu ? <IconChevronUp size="1.5rem" /> : <IconChevronDown size="1.5rem" />}
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
          },
        }}
      >
        <Box p={3}>
          <Stack direction="row" pb={3} spacing={2} alignItems="center">
            <Box>
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
            <MenuItem menuItem={menuItem} key={menuItem.title} />
          ))}
          <Logout usage="profilemenu" />
        </Box>
      </Menu>
    </Box>
  );
};

export default ProfileMenuDesktop;
