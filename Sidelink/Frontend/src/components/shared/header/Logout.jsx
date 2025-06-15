import { Box, Typography, IconButton, Tooltip, useTheme, Button } from '@mui/material';
import { IconPower } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutService } from 'src/services/LogoutService';

const Logout = ({ usage }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dashboardData } = useSelector(state => state.dashboard);

  const handleLogout = () => {
    logoutService({ dispatch, navigate });
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
