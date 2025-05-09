import { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { Link, Chip, Typography, Button, Box, useTheme, useMediaQuery, Stack, Tooltip, IconButton, TextField, InputAdornment } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import StyledCard from 'src/components/dashboard/shared/StyledCard';
import { useDispatch, useSelector } from 'react-redux';

import { filterServicesBySearch } from './utils/searchUtils';
import { setSearchEngineData, setSearchMask, setInit } from 'src/store/publicdata/PublicDataManagment';

import { isAnyMaskFilterActive, checkActiveMaskFilters } from 'src/components/main/board/utils/storeUtils';
import { filterServicesByType, filterServicesByActiveMaskFilters } from 'src/components/main/board/utils/searchUtils';

import Listing from './listing/Listing';
import SearchMask from './search/SearchMask';
import GradientCircularProgress from 'src/components/shared/Spinner';

import 'src/assets/styles/main/board/board.scss';

//import { setSearchEngineData, loading, error, success, init } from 'src/store/publicdata/PublicDataManagment';

function Board() {
  const theme = useTheme();
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const { publicServices, searchMask, loading, error, success, init } = useSelector(state => state.publicdata.publicData);

  const dispatch = useDispatch();
  const { search } = useLocation();

  /*
   * If we page initially we set search results upon url params
   */
  useEffect(() => {
    // params = new URLSearchParams(search);
    let params = new URLSearchParams(search);

    if (success) {
      const newSearchMask = {};
      if (params.has('region')) {
        newSearchMask.region = { type: 'region', data: params.get('region') };
      }
      dispatch(setSearchMask({ type: 'region', data: params.get('region') ?? false }));
      if (params.has('type')) {
        newSearchMask.serviceType = { type: 'type', data: params.get('type') };
      }
      dispatch(setSearchMask({ type: 'type', data: params.get('type') ?? false }));
      if (params.has('category')) {
        newSearchMask.category = { type: 'category', data: params.get('category') };
      }

      dispatch(setSearchMask({ type: 'category', data: params.get('category') ?? false }));
      if (params.has('subCategories')) {
        newSearchMask.subCategories = { type: 'subCategories', data: params.get('subCategories') };
      }
      dispatch(setSearchMask({ type: 'subCategories', data: params.get('subCategories') ?? false }));

      if (isAnyMaskFilterActive(newSearchMask)) {
        const activeFilters = checkActiveMaskFilters(newSearchMask);

        let newSearchEngineData = filterServicesByActiveMaskFilters(publicServices, activeFilters);
        if (params.get('search')) {
          newSearchEngineData = filterServicesBySearch(newSearchEngineData, params.get('search'));
        }
        dispatch(setSearchEngineData(newSearchEngineData));
      } else if (params.get('search')) {
        let newSearchEngineData = filterServicesBySearch(publicServices, params.get('search'));
        dispatch(setSearchEngineData(newSearchEngineData));
      } else if (!init) {
        dispatch(setSearchEngineData(publicServices));
      }
      if (init) {
        dispatch(setInit(false));
      }
    }
  }, [success]);

  return (
    <>
      <Box component="section" sx={{ padding: '2rem 0' }}>
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
          Search.{' '}
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
          Hier findest du was du suchst
        </Typography>
        {/* 
        <Box component="article" sx={{ marginTop: '2rem' }}>
          <TextField
            fullWidth
            placeholder="Suche starten..."
            variant="outlined"
            value={searchValue}
            onChange={event => {
              handleNewSearch(event.target.value);
            }}
            sx={{
              borderRadius: '8px',
              margin: '4rem 0',
              '& .MuiInputBase-input': {
                color: theme.palette.text.dark,
                fontSize: '1.5rem',
                fontWeight: '500',
              },
              '& .MuiInputBase-root': {
                backgroundColor: theme.palette.background.white,
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleNewSearch('')}>
                      <IconX size="36" color="black" />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      
  ) :
        {init || loading ? (
          <GradientCircularProgress />
        ) : error ? (
          <Typography color="error" sx={{ textAlign: 'center', margin: '6rem 0' }}>
            Technische Störungen, bitte versuche es später nochmals oder{' '}
            <Typography sx={{ marginTop: '1rem', color: 'white', textDecoration: 'underline', textAlign: 'center', a: { color: 'inherit' } }}>
              <Link component={RouterLink} to="/contact">
                kontaktiere uns
              </Link>
            </Typography>
            {error}
          </Typography>
        ) : !init && success ? (
          
          <>
            <Box component="article" sx={{ marginTop: '2rem' }}>
              <SearchMask />
            </Box>
            <Listing />
          </>

        ) : (
          ''
        )} */}

        {init || loading ? (
          <GradientCircularProgress />
        ) : error ? (
          <Typography color="error" sx={{ textAlign: 'center', margin: '6rem 0' }}>
            Technische Störungen, bitte versuche es später nochmals oder{' '}
            <Typography sx={{ marginTop: '1rem', color: 'white', textDecoration: 'underline', textAlign: 'center', a: { color: 'inherit' } }}>
              <Link component={RouterLink} to="/contact">
                kontaktiere uns
              </Link>
            </Typography>
            {error}
          </Typography>
        ) : !init && success ? (
          <>
            <Grid container sx={{ backgroundColor: '' }}>
              <Grid size={12}>
                <StyledCard variant={'outlined'} sx={{ backgroundColor: theme.palette.background.main, marginTop: '2rem' }}>
                  <CardContent>
                    <SearchMask />
                    <Listing />
                  </CardContent>
                </StyledCard>
              </Grid>
            </Grid>
          </>
        ) : (
          ''
        )}
      </Box>
    </>
  );
}

export default Board;
