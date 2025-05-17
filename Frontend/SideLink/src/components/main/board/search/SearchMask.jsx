import { Box, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid2';

import SerachText from './SearchText';
import SearchRegion from './SearchRegion';
import SearchType from './SearchType';
import SearchCategories from './SearchCategories';

function SearchMask() {
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <>
      <Box component="aside">
        <SerachText />
        <Box>
          <Grid container spacing={smDown ? 4 : 6}>
            <SearchCategories />

            <SearchRegion />

            <SearchType />
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default SearchMask;
