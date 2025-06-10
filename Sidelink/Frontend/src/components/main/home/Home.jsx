import { Box, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { likedCategories } from 'src/config/CategoriesConfigurations';
import Heading from 'src/components/main/shared/Heading';
import CategoryItem from './parts/CategoryItem';
import HomeSearch from './parts/HomeSearch';

function Home() {
  const theme = useTheme();

  return (
    <Box component="section" data-testid="home-component" sx={{ padding: '2rem 0' }}>
      <Heading titleKey1={'Create.'} titleKey2={'Connect.'} titleKey3={'Complete.'} />

      <Box component="article">
        <HomeSearch />
      </Box>

      <Box component="article" sx={{ marginTop: { xs: '4rem', lg: '2rem' } }}>
        <Typography component="h3" sx={{ fontSize: { xs: '1.4rem', lg: '1.8rem' }, mt: 4, color: theme.palette.text.primary, fontWeight: 700 }}>
          Beliebte Kategorien
        </Typography>

        <Grid container component="ul" mt={{ xs: '1rem', lg: '2rem' }} rowSpacing={{ xs: 2 }} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
          {likedCategories.map((categoryConfig, i) => (
            <CategoryItem key={i} {...categoryConfig}></CategoryItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;
