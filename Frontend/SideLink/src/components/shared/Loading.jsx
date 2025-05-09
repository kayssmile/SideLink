import { Box, useTheme } from '@mui/material';

import Spinner from 'src/components/shared/Spinner';

function Loading() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
        '&:before': {
          content: '""',
          background: 'radial-gradient(#7c1cf0, #192cd7, #e80707)',
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
