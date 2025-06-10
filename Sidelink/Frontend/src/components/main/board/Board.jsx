import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, useTheme, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchEngineData, setSearchMask, setInit } from 'src/store/publicdata/PublicDataManagment';
import { basicErrorMessageLink } from 'src/components/shared/utils/ErrorHandling';
import { isAnyMaskFilterActive, checkActiveMaskFilters } from 'src/components/main/board/utils/StoreUtils';
import { filterServicesByActiveMaskFilters, filterServicesBySearch } from 'src/components/main/board/utils/SearchUtils';
import Heading from 'src/components/main/shared/Heading';
import Listing from './listing/Listing';
import SearchMask from './search/SearchMask';
import Spinner from 'src/components/shared/Spinner';
import StyledCard from 'src/components/dashboard/shared/StyledCard';

function Board() {
  const theme = useTheme();
  const { publicServices, loading, error, success, init } = useSelector(state => state.publicData.publicData);

  const dispatch = useDispatch();
  const { search } = useLocation();

  /*
   * If we load page initially we set search results upon url params
   */
  useEffect(() => {
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
    if (error) {
      dispatch(setInit(false));
    }
  }, [success, error]);

  return (
    <Box component="section" sx={{ padding: '2rem 0' }}>
      <Heading titleKey1={'Search.'} titleKey2={'Connect.'} titleKey3={'Complete.'} subTitle={'Hier findest du was du suchst.'} />

      {init || loading ? (
        <Spinner />
      ) : error ? (
        basicErrorMessageLink(error)
      ) : !init && success ? (
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
      ) : null}
    </Box>
  );
}

export default Board;
