import { Link } from 'react-router-dom';
import { Box, Avatar, Typography } from '@mui/material';
import { Stack } from '@mui/system';

const MenuItem = ({ menuItem }) => {
  return (
    <Box key={menuItem.title}>
      <Box sx={{ paddingTop: { xs: 2 }, px: 0 }} className="hover-text-primary">
        <Link to={menuItem.to}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Box
              sx={{
                width: { xs: '30px', sm: '45px' },
                height: { xs: '30px', sm: '45px' },
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
                component="h4"
                sx={{
                  width: '240px',
                }}
              >
                {menuItem.title}
              </Typography>
              <Typography
                color="textSecondary"
                variant="subtitle2"
                component="h5"
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
