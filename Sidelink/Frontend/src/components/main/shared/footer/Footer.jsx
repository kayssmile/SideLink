import { Box, Typography, Container, Stack, Tooltip, useTheme, styled, Link } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { NavLink } from 'react-router-dom';
import IconFacebook from 'src/assets/images/icons/icon-facebook.svg';
import IconInstagram from 'src/assets/images/icons/icon-instagram.svg';

import FooterLinks from './parts/FooterLinks';

const Footer = () => {
  const theme = useTheme();

  const MainFooter = styled('footer')(() => ({
    backgroundColor: theme.palette.background.dark,
    width: '100%',
    color: theme.palette.text.primary,
  }));

  return (
    <MainFooter data-testid="main-footer">
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" sx={{ paddingTop: { xs: '2rem', md: '4rem', xl: '5rem' } }}>
          <Grid size={{ xs: 12, sm: 4, md: 3 }} component="aside">
            <Typography sx={{ fontSize: { xs: '1.4rem', xl: '1.5rem' }, mb: { xs: '0.4rem', md: '1.7rem' }, color: theme.palette.text.primary, fontWeight: 600 }} component="h2">
              Sidelink
            </Typography>
            <Typography fontSize="1rem" fontWeight="400" component="p">
              Finde den Service den du brauchst, dort wo du ihn brauchst.
            </Typography>
          </Grid>

          <FooterLinks />

          <Grid size={{ xs: 12, lg: 2 }}>
            <Typography
              sx={{ fontSize: { xs: '1.2rem', sm: '1.4', xl: '1.5rem' }, mb: { xs: '0.1rem', md: '1.2rem' }, mt: { xs: '1.5rem', sm: '0' }, color: theme.palette.text.primary, fontWeight: 600 }}
            >
              Follow us
            </Typography>

            <Stack direction="row" gap="20px">
              <Tooltip title="Facebook">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                  <img src={IconFacebook} alt="facebook" width={22} height={22} />
                </a>
              </Tooltip>

              <Tooltip title="Instagram">
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                  <img src={IconInstagram} alt="link instagram" width={22} height={22} />
                </a>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ paddingBottom: '2rem', paddingTop: { xs: '3rem', md: '4rem' }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography fontSize="16px" fontWeight="400" mb="1rem" component="p">
            2025 Sidelink. All rights reserved
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Link underline="none" color="#0202f7" component={NavLink} to={'imprint'}>
              Impressum
            </Link>
            <Typography component="span" margin={'0 0.5rem'}>
              |
            </Typography>
            <Link underline="none" color="#0202f7" component={NavLink} to={'data-privacy'}>
              Datenschutz
            </Link>
          </Box>
        </Box>
      </Container>
    </MainFooter>
  );
};

export default Footer;
