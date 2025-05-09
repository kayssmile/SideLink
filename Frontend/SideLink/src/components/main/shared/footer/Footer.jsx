import { styled } from '@mui/material';

import { useTheme } from '@mui/material/styles';

import { Box, Typography, Container, Divider, Stack, Tooltip } from '@mui/material';

import Grid from '@mui/material/Grid2';

import { Link, NavLink } from 'react-router';

import IconFacebook from 'src/assets/images/icons/icon-facebook.svg';
import IconTwitter from 'src/assets/images/icons/icon-twitter.svg';
import IconInstagram from 'src/assets/images/icons/icon-instagram.svg';

const footerLinks = [
  {
    id: 1,
    elements: [
      {
        title: true,
        titleText: 'Quicklinks',
      },
      {
        title: false,
        titleText: 'Dashboard',
        to: '/dashboard',
      },
      {
        title: false,
        titleText: 'Login',
        to: '/login',
      },
      {
        title: false,
        titleText: 'Registriere DDD',
        to: '/registration',
      },
      {
        title: false,
        titleText: 'Kontakt',
        to: '/contact',
      },
    ],
  },
  {
    id: 2,
    elements: [
      {
        title: true,
        titleText: 'Kategorien',
      },
      {
        title: false,
        titleText: 'Haushalt',
        to: '/board?categorie=household',
      },
      {
        title: false,
        titleText: 'Garten',
        to: '/board?categorie=garden',
      },
      {
        title: false,
        titleText: 'Handwerk',
        to: '/board?categorie=handwork',
      },
      {
        title: false,
        titleText: 'Einrichtung',
        to: '/board?categorie=furniture',
      },
      {
        title: false,
        titleText: 'Umzug',
        to: '/board?categorie=relocate',
      },
      {
        title: false,
        titleText: 'Gesundheit',
        to: '/board?categorie=health',
      },
    ],
  },
];

const Footer = () => {
  const theme = useTheme();

  const MainFooter = styled('footer')(() => ({
    backgroundColor: 'black',
    width: '100%',
    color: 'white',
  }));

  return (
    <MainFooter data-testid="main-footer">
      <Container maxWidth="lg">
        <Grid container justifyContent="space-between" pt={8}>
          <Grid size={4}>
            <Typography fontSize="18px" fontWeight="600" mb="22px" component="h3">
              Sidelink
            </Typography>
            <Typography fontSize="17px" fontWeight="300" mb="22px" component="p">
              Finde den Service den du brauchst, in deiner Umgebung
            </Typography>
            <p></p>
          </Grid>

          {footerLinks.map((footerItem, i) => (
            <Grid size={{ xs: 6, sm: 4, lg: 2 }} key={i}>
              {footerItem.elements.map((element, index) =>
                element.title ? (
                  <Typography key={index} fontSize="17px" fontWeight="600" mb="22px">
                    {element.titleText}
                  </Typography>
                ) : (
                  <NavLink to={element.to} key={index}>
                    <Typography
                      sx={{
                        display: 'block',
                        padding: '10px 0',
                        fontSize: '15px',
                        color: theme.palette.font.primary,
                        '&:hover': {
                          color: theme.palette.primary.main,
                        },
                      }}
                      component="p"
                    >
                      {element.titleText}
                    </Typography>
                  </NavLink>
                )
              )}
            </Grid>
          ))}

          <Grid size={2}>
            <Typography fontSize="17px" fontWeight="600" mb="22px" color="theme.palette.font.primary">
              Follow us
            </Typography>

            <Stack direction="row" gap="20px">
              <Tooltip title="Facebook">
                <NavLink to="#">
                  <img src={IconFacebook} alt="facebook" width={22} height={22} />
                </NavLink>
              </Tooltip>
              <Tooltip title="Twitter">
                <NavLink to="#">
                  <img src={IconTwitter} alt="twitter" width={22} height={22} />
                </NavLink>
              </Tooltip>
              <Tooltip title="Instagram">
                <NavLink to="#">
                  <img src={IconInstagram} alt="instagram" width={22} height={22} />
                </NavLink>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>

        <Box py="40px" flexDirection="column" display="flex" alignItems="center" justifyContent="center">
          <Typography fontSize="16px" fontWeight="400" mb="22px" component="p">
            2025 Sidelink. All rights reserved
          </Typography>
          <NavLink to="/legal">
            <Typography fontSize="17px" fontWeight="300" mb="22px" component="p">
              Impressum & Datenschutz
            </Typography>
          </NavLink>
        </Box>
      </Container>
    </MainFooter>
  );
};

export default Footer;
