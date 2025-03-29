import { Link } from 'react-router-dom';
import { profileMenu as profileMenuConfiguration } from 'src/components/shared/configuration/Configuration';

import { Box, Avatar, Typography, Divider, Button } from '@mui/material';
import { IconMail } from '@tabler/icons-react';
import { Stack } from '@mui/system';
import { useTheme } from '@mui/material/styles';

import { logout } from 'src/store/usermanagment/UserManagment';
import { useDispatch, useSelector } from 'react-redux';

const ProfileMenuMobile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userManagment.userInfo);

  return (
    <>
      <Stack
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
          marginBottom: '10px',
        }}
      >
        <Typography variant="subtitle1" color="white" fontWeight={600}>
          {userInfo?.first_name} {userInfo?.last_name}
        </Typography>
        <Typography variant="subtitle1" color="white">
          {userInfo?.profession}
        </Typography>
        <Typography variant="subtitle1" color="white" display="flex" alignItems="center" gap={1}>
          <IconMail width={15} height={15} />
          {userInfo?.email}
        </Typography>
      </Stack>

      <Divider />

      {profileMenuConfiguration.map(menuItem => (
        <Box
          key={menuItem.title}
          sx={{
            padding: '5px 5px',
            paddingBottom: '7px',
            margin: '10px 0',
            width: '100%',
            '&:hover': {
              backgroundColor: theme.palette.background.primary,
            },
            '&:hover h6': {
              color: theme.palette.background.secondary,
            },
          }}
        >
          <Link to={menuItem.to}>
            <Stack
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%',
              }}
            >
              <Avatar
                src={menuItem.icon}
                alt={menuItem.icon}
                sx={{
                  width: 24,
                  height: 24,
                  marginRight: '10px',
                }}
              />

              <Typography
                variant="subtitle2"
                fontWeight={600}
                className="text-hover"
                noWrap
                sx={{
                  color: theme.palette.font.secondary,
                  fontSize: '16px',
                  marginTop: '2px',
                }}
              >
                {menuItem.title}
              </Typography>
            </Stack>
          </Link>
        </Box>
      ))}
      <Box mt={5}>
        <Button onClick={() => dispatch(logout())} variant="outlined" color="primary" fullWidth>
          Logout
        </Button>
      </Box>
    </>
  );
};

export default ProfileMenuMobile;
