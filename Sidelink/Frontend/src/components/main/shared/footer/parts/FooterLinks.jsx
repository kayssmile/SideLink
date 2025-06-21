import { Typography, useTheme, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { footerLinks } from 'src/config/NavigationConfigurations';

const FooterLinks = () => {
  const theme = useTheme();
  const location = useLocation();

  return (
    <>
      {footerLinks.map((footerItem, i) => (
        <Grid size={{ xs: 12, sm: 3 }} key={i} component="nav" aria-label="Footer Navigation">
          {footerItem.elements.map((element, index) =>
            element.title ? (
              <Box key={index}>
                <Typography
                  component="h3"
                  key={index}
                  sx={{ fontSize: { xs: '1.2rem', lg: '1.4rem' }, mb: { xs: '0.1rem', md: '1.2rem' }, mt: { xs: '1.5rem', sm: '0' }, color: theme.palette.text.primary, fontWeight: 600 }}
                >
                  {element.titleText}
                </Typography>
              </Box>
            ) : location.pathname === '/board' && element.to.includes('category') ? (
              <Box key={index}>
                <Typography
                  sx={{
                    display: 'block',
                    padding: { xs: '0.2rem', md: '0.5rem 0' },
                    fontSize: { xs: '1.1rem', xl: '1.2rem' },
                    color: theme.palette.font.primary,
                  }}
                  component="h4"
                  key={index}
                >
                  {element.titleText}
                </Typography>
              </Box>
            ) : (
              <Box key={index}>
                <Box component={RouterNavLink} to={element.to}>
                  <Typography
                    component="h4"
                    sx={{
                      display: 'block',
                      padding: { xs: '0.3rem 0', md: '0.5rem 0' },
                      fontSize: { xs: '1.1rem', xl: '1.2rem' },
                      color: theme.palette.font.primary,
                      '&:hover': {
                        color: theme.palette.font.hover,
                      },
                    }}
                  >
                    {element.titleText}
                  </Typography>
                </Box>
              </Box>
            )
          )}
        </Grid>
      ))}
    </>
  );
};

export default FooterLinks;
