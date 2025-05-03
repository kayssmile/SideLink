import { Box, Stack, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';

function CategoryItem({ urlParam, imgSrc, title, imgDesc }) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <Grid size={4}>
      <Box to={`/board/?category=${encodeURIComponent(urlParam)}`} component={Link} sx={{ display: 'flex', flexDirection: 'column' }}>
        <img src={imgSrc} alt={imgDesc} style={{ borderRadius: '16px' }} />
        <Typography
          variant="h4"
          sx={{
            fontSize: {
              xs: '18px',
              sm: '22px',
              marginTop: '1rem',
            },
          }}
          color={theme.palette.text.primary}
          fontWeight={600}
          component="span"
        >
          {title}
        </Typography>
      </Box>
    </Grid>
  );
}

export default CategoryItem;
