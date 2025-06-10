import { Link, Breadcrumbs, Box, Typography, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { IconCircle } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';
import breadcrumbImg from 'src/assets/images/breadcrumb/ChatBc.png';
import { useTheme } from '@mui/material/styles';

const Breadcrumb = ({ subtitle, items, title }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      sx={{
        backgroundColor: theme.palette.primary.main,
        borderRadius: '8px',
        p: '30px 25px 20px',
        margin: '30px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Grid size={{ xs: 12, md: 10 }} mb={1}>
        <Typography variant="h4" color="textPrimary" sx={{ fontSize: smDown ? '1.5rem' : '2rem' }}>
          {title}
        </Typography>
        <Typography color="textPrimary" variant="h6" fontWeight={400} mt={0.8} mb={0} sx={{ fontSize: smDown ? '1.5rem' : '2rem' }}>
          {subtitle}
        </Typography>
        <Breadcrumbs
          separator={<IconCircle size="5" fill="textPrimary" fillOpacity={'0.9'} style={{ margin: '0 5px' }} />}
          sx={{ alignItems: 'center', mt: items ? '10px' : '' }}
          aria-label="breadcrumb"
        >
          {items
            ? items.map(item => (
                <div key={item.title}>
                  {item.to ? (
                    <Link underline="none" color="textPrimary" component={NavLink} to={item.to}>
                      {item.title}
                    </Link>
                  ) : (
                    <Typography color="textPrimary">{item.title}</Typography>
                  )}
                </div>
              ))
            : ''}
        </Breadcrumbs>
      </Grid>
      <Grid size={{ md: 2 }} display="flex" alignItems="flex-end">
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          <Box sx={{ top: '0px', position: 'absolute' }}>
            <img src={breadcrumbImg} alt={breadcrumbImg} width={'165px'} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Breadcrumb;
