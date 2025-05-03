import { Link } from 'react-router-dom';
import { Box, Avatar, Typography, useMediaQuery } from '@mui/material';

import { Stack } from '@mui/system';

const MenuItem = ({ menuItem }) => {
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <Box key={menuItem.title}>
      <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
        <Link to={menuItem.to}>
          <Stack direction={smDown ? 'column' : 'row'} spacing={2}>
            <Box
              sx={{
                width: smDown ? '30px' : '45px',
                height: smDown ? '30px' : '45px',
                bgcolor: theme => theme.palette.background.main,
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
                color="textSecondary"
                className="text-hover"
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
              >
                {menuItem.subtitle}
              </Typography>
            </Box>
          </Stack>
        </Link>
      </Box>
    </Box>
  );
};

export default MenuItem;
