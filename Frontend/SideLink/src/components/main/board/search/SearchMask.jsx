import { useEffect, useState } from 'react';
import { CardContent, Typography, Box, Button, CircularProgress, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { useDispatch, useSelector } from 'react-redux';

import SerachText from './SearchText';
import StyledCard from 'src/components/dashboard/shared/StyledCard';
import SearchRegion from './SearchRegion';
import SearchType from './SearchType';
import SearchCategories from './SearchCategories';

function SearchMask() {
  const dispatch = useDispatch();

  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <>
      <Grid container>
        <Grid size={12}>
          <StyledCard variant={'outlined'} sx={{}}>
            <CardContent>
              <SerachText />

              <Box>
                <Grid container spacing={smDown ? 4 : 6}>
                  <SearchCategories />

                  <SearchRegion />

                  <SearchType />
                </Grid>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </>
  );
}

export default SearchMask;
