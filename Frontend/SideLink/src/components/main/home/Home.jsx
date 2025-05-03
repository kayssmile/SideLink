import { Box, Stack, Typography, AvatarGroup, Avatar, Container, Button, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';

import { likedCategories } from 'src/config/CategoriesConfigurations';

import CategoryItem from './parts/CategoryItem';
import HomeSearch from './parts/HomeSearch';

function Home() {
  const theme = useTheme();
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <>
      <Box component="section" data-testid="home-component" sx={{ padding: '2rem 0' }}>
        <Typography
          variant="h1"
          fontWeight={700}
          lineHeight="1.2"
          color={theme.palette.text.primary}
          sx={{
            fontSize: {
              xs: '40px',
              sm: '56px',
            },
          }}
        >
          Create.{' '}
          <Typography
            variant="h1"
            sx={{
              fontSize: {
                xs: '40px',
                sm: '56px',
              },
            }}
            fontWeight={700}
            component="span"
          >
            Connect.
          </Typography>{' '}
          Complete.
        </Typography>

        <Typography
          variant="body1"
          color={theme.palette.text.primary}
          sx={{
            fontSize: {
              xs: '22px',
              sm: '24px',
              opacity: '0.7',
            },
          }}
          fontWeight={700}
        >
          Starte deine Suche oder teile dein Können – alles an einem Ort.
        </Typography>
        <Box component="article" sx={{ marginTop: '2rem' }}>
          <HomeSearch />
        </Box>
        <Box component="article" sx={{ marginTop: '2rem' }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: {
                xs: '22px',
                sm: '26px',
              },
            }}
            color={theme.palette.text.primary}
            fontWeight={700}
            component="span"
          >
            Beliebte Kategorien
          </Typography>
          <Grid container mt={6} rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 8 }}>
            {likedCategories.map((categoryConfig, i) => (
              <CategoryItem urlParam={categoryConfig.urlParam} imgSrc={categoryConfig.imgSrc} title={categoryConfig.title} imgDesc={categoryConfig.imgDesc} key={i}></CategoryItem>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Home;
