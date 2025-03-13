import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Menu, Avatar, Typography, Divider, Button, IconButton } from '@mui/material';
import * as dropdownData from 'src/components/shared/header/data';

import { IconMail } from '@tabler/icons-react';
import { Stack } from '@mui/system';

import ProfileImg from 'src/assets/images/profile/user-1.jpg';

import Scrollbar from 'src/components/shared/custom-scroll/Scrollbar';
import { useTheme } from '@mui/material/styles';

const Profile = () => {
  const theme = useTheme();
  const [profileMenu, setProfileMenu] = useState(null);
  const handleProfileMenu = event => {
    setProfileMenu(event.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setProfileMenu(null);
  };

  return (
    <Box>
      <IconButton size="large" color="inherit" aria-controls="msgs-menu" aria-haspopup="true" onClick={handleProfileMenu}>
        <Avatar
          src={ProfileImg}
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>

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
        <Scrollbar sx={{ height: '100%', maxHeight: '85vh' }}>
          <Box p={3}>
            <Stack direction="row" pb={3} spacing={2} alignItems="center">
              <Avatar src={ProfileImg} alt={ProfileImg} sx={{ width: 95, height: 95 }} />
              <Box>
                <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                  Mathew Anderson
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Designer
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" display="flex" alignItems="center" gap={1}>
                  <IconMail width={15} height={15} />
                  info@modernize.com
                </Typography>
              </Box>
            </Stack>

            <Divider />
            {dropdownData.profile.map(profile => (
              <Box key={profile.title}>
                <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
                  <Link to={profile.to}>
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
                          src={profile.icon}
                          alt={profile.icon}
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
                          {profile.title}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          sx={{
                            width: '240px',
                          }}
                          noWrap
                        >
                          {profile.subtitle}
                        </Typography>
                      </Box>
                    </Stack>
                  </Link>
                </Box>
              </Box>
            ))}
            <Box mt={2}>
              <Button to="/auth/login" variant="outlined" color="primary" component={Link} fullWidth>
                Logout
              </Button>
            </Box>
          </Box>
        </Scrollbar>
      </Menu>
    </Box>
  );
};

export default Profile;
