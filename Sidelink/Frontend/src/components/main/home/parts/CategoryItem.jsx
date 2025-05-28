import { Box, Stack, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';

function CategoryItem({ urlParam, imgSrc, title, imgDesc }) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'));

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Box to={`/board/?category=${encodeURIComponent(urlParam)}`} component={Link} sx={{ display: 'flex', flexDirection: 'column' }}>
        <img src={imgSrc} alt={imgDesc} style={{ borderRadius: '16px' }} />
        <Typography
          component="h3"
          sx={{
            fontSize: {
              xs: '1.2rem',
              sm: '1.4',
              xl: '1.5rem',
              // marginTop: mdDown ? '0.6rem' : '1rem',
            },
          }}
          color={theme.palette.text.primary}
          fontWeight={600}
        >
          {title}
        </Typography>
      </Box>
    </Grid>
  );
}

export default CategoryItem;
