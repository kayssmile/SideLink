import { Box } from '@mui/material';
import { useLocation } from 'react-router';

import Spinner from 'src/components/shared/Spinner';

function Loading() {
  const location = useLocation();
  const isInDashboardLayout = location.pathname.includes('dashboard');

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: isInDashboardLayout ? '100vh' : 'auto',
        minWidth: isInDashboardLayout ? '100vw' : 'auto',
        '&:before': {
          content: '""',
          background: isInDashboardLayout ? 'radial-gradient(#7c1cf0, #192cd7, #e80707)' : 'transparent',
          backgroundSize: '400% 400%',
          position: 'absolute',
          height: '100%',
          width: '100%',
          opacity: '0.9',
        },
      }}
    >
      <Spinner size={'8rem'} />
    </Box>
  );
}

export default Loading;
