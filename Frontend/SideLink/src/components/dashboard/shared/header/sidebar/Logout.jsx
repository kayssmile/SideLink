import { Box, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';

import { IconPower } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

export const Logout = () => {
  const theme = useTheme();

  //const lgUp = useMediaQuery(theme => theme.breakpoints.up('md'));
  //const hideMenu = lgUp ? false : '';

  return (
    <Box display={'flex'} alignItems="center" gap={2} sx={{ m: 3, p: 2, bgcolor: theme.palette.background.third, borderRadius: '5px' }}>
      <Box>
        <Typography variant="h6" color="white">
          Kay Hertenstein
        </Typography>
        <Typography variant="caption" color={theme.palette.font.secondary}>
          Developer
        </Typography>
      </Box>
      <Box sx={{ ml: 'auto' }}>
        <Tooltip title="Logout" placement="top">
          <IconButton
            component={Link}
            to="/auth/login"
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
  );
};
