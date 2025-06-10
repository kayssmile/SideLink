import { Box, Typography, IconButton, Tooltip, useTheme, Button } from '@mui/material';
import { IconPower } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import invalidateToken from 'src/services/TokenInvalidator';
import { removeToken, removeRefreshToken, getRefreshToken } from 'src/components/shared/utils/TokenUtils';
import { userLogout } from 'src/store/usermanagment/UserManagment';
import { dashboardLogout } from 'src/store/dashboard/main/DashboardManagment';

const Logout = ({ usage }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { dashboardData } = useSelector(state => state.dashboard);
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate('/home');
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      await invalidateToken(refreshToken);
    }
    removeToken();
    removeRefreshToken();
    dispatch(userLogout());
    dispatch(dashboardLogout());
  };

  return (
    <>
      {usage === 'sidebar' ? (
        <Box gap={2} sx={{ display: 'flex', m: 3, p: 2, bgcolor: theme.palette.background.third, borderRadius: '5px', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6" color="white">
              {dashboardData.user?.first_name} {dashboardData.user?.last_name}
            </Typography>
            <Typography variant="caption" color={theme.palette.font.secondary}>
              {dashboardData.user?.profession}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                onClick={handleLogout}
                aria-label="logout"
                size="small"
                sx={{
                  color: 'primary.main',
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: 'white',
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              >
                <IconPower size="30" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      ) : (
        <Box mt={2}>
          <Button onClick={handleLogout} variant="outlined" color="primary" fullWidth>
            Logout
          </Button>
        </Box>
      )}
    </>
  );
};

export default Logout;
