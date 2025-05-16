import { Box, Stack, Typography, AvatarGroup, Avatar, Container, Button, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';

import { likedCategories } from 'src/config/CategoriesConfigurations';

import Heading from 'src/components/main/shared/Heading';
import CategoryItem from './parts/CategoryItem';
import HomeSearch from './parts/HomeSearch';

function Home() {
  const theme = useTheme();
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <>
      <Box component="section" data-testid="home-component" sx={{ padding: '2rem 0' }}>
        <Heading titleKey1={'Create.'} titleKey2={'Connect.'} titleKey3={'Complete.'} />

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
