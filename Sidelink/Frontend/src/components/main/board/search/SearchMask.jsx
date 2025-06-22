import { useState, useRef } from 'react';
import { Box, Switch, Slide, FormControlLabel } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SerachText from './SearchText';
import SearchRegion from './SearchRegion';
import SearchType from './SearchType';
import SearchCategories from './SearchCategories';

function SearchMask() {
  const [checked, setChecked] = useState(localStorage.getItem('showFilters') === 'true' || false);
  const containerRef = useRef(null);

  const handleChange = () => {
    setChecked(prev => !prev);
    localStorage.setItem('showFilters', !checked);
  };

  return (
    <Box component="aside">
      <SerachText />

      <Box sx={{ p: 2, height: checked ? { xs: '500px', md: '250px' } : '30px', overflow: 'hidden' }} ref={containerRef}>
        <FormControlLabel sx={{ position: 'relative', left: { xs: '0%', xl: '85%' } }} control={<Switch checked={checked} onChange={handleChange} />} label="Filter anzeigen" />
        <Slide in={checked} container={containerRef.current}>
          <Grid container spacing={{ xs: 4, md: 6 }}>
            <SearchCategories />

            <SearchRegion />

            <SearchType />
          </Grid>
        </Slide>
      </Box>
    </Box>
  );
}

export default SearchMask;
