import { useState } from 'react';
import { Link } from 'react-router-dom';
import { profileMenu as profileMenuConfiguration } from 'src/components/shared/configuration/Configuration';

import { Box, Menu, Avatar, Typography, Divider, Button } from '@mui/material';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { IconMail } from '@tabler/icons-react';
import { Stack } from '@mui/system';
import { useTheme } from '@mui/material/styles';

import { logout } from 'src/store/usermanagment/UserManagment';
import { useDispatch, useSelector } from 'react-redux';

const ProfileMenuDesktop = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userManagment.userInfo);
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
          {`Guten Tag, ${userInfo?.first_name} ${userInfo?.last_name}`}
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
              <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                {userInfo?.first_name} {userInfo?.last_name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {userInfo?.profession}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" display="flex" alignItems="center" gap={1}>
                <IconMail width={15} height={15} />
                {userInfo?.email}
              </Typography>
            </Box>
          </Stack>

          <Divider />
          {profileMenuConfiguration.map(menuItem => (
            <Box key={menuItem.title}>
              <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
                <Link to={menuItem.to}>
                  <Stack direction="row" spacing={2}>
                    <Box
                      sx={{
                        width: '45px',
                        height: '45px',
                        bgcolor: theme.palette.background.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '5px',
                      }}
                    >
                      <Avatar
                        src={menuItem.icon}
                        alt={menuItem.icon}
                        sx={{
                          width: 24,
                          height: 24,
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        color="textPrimary"
                        className="text-hover"
                        noWrap
                        sx={{
                          width: '240px',
                        }}
                      >
                        {menuItem.title}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        sx={{
                          width: '240px',
                        }}
                        noWrap
                      >
                        {menuItem.subtitle}
                      </Typography>
                    </Box>
                  </Stack>
                </Link>
              </Box>
            </Box>
          ))}
          <Box mt={2}>
            <Button onClick={() => dispatch(logout())} variant="outlined" color="primary" fullWidth>
              Logout
            </Button>
          </Box>
        </Box>
      </Menu>
    </Box>
  );
};

export default ProfileMenuDesktop;
