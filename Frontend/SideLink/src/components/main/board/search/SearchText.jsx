import { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { Box, useTheme, useMediaQuery, IconButton, TextField, InputAdornment } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { IconX } from '@tabler/icons-react';
import { filterServicesBySearch, filterServicesByActiveMaskFilters } from 'src/components/main/board/utils/searchUtils';

import { isAnyMaskFilterActive, checkActiveMaskFilters } from 'src/components/main/board/utils/storeUtils';
import { useGetUrlParam, useAddUrlParam, useRemoveUrlParams, useGetUrlParamReaktiv } from 'src/components/main/board/hooks/UrlHooks';

import { setSearchEngineData } from 'src/store/publicdata/PublicDataManagment';

function SearchText() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const [searchValue, setSearchValue] = useState('');

  const { publicServices, searchMask, searchEngineData, init } = useSelector(state => state.publicdata.publicData);

  const setUrlParam = useAddUrlParam();
  const removeUrlParams = useRemoveUrlParams();
  //const urlTextSearchParam = useGetUrlParam('search');

  const urlTextSearchParam = useGetUrlParamReaktiv('search');
  /*
   * New filtering starts after 300ms break
   */

  const handleNewSearchValue = debounce(newSearchValue => {
    let newSerachEngineData = [];

    if (isAnyMaskFilterActive(searchMask)) {
      const activeFilters = checkActiveMaskFilters(searchMask);
      newSerachEngineData = filterServicesByActiveMaskFilters(publicServices, activeFilters);
      newSerachEngineData = filterServicesBySearch(newSerachEngineData, newSearchValue);
    } else {
      newSerachEngineData = filterServicesBySearch(publicServices, newSearchValue);
    }

    setUrlParam('search', newSearchValue);
    dispatch(setSearchEngineData(newSerachEngineData));
  }, 300);

  /*
   * If search value is null we load all publicservices, otherwise we filter all publicservices upon input value
   */
  const handleNewSearch = newSearchValue => {
    setSearchValue(newSearchValue);

    if (newSearchValue == '' || newSearchValue == null) {
      removeUrlParams(['search']);
      if (isAnyMaskFilterActive(searchMask)) {
        const activeFilters = checkActiveMaskFilters(searchMask);

        let newSerachEngineData = filterServicesByActiveMaskFilters(publicServices, activeFilters);
        dispatch(setSearchEngineData(newSerachEngineData));
      } else {
        dispatch(setSearchEngineData(publicServices));
      }
    } else {
      handleNewSearchValue(newSearchValue);
    }
  };

  useEffect(() => {
    if (!init && urlTextSearchParam) {
      setSearchValue(urlTextSearchParam);
      //handleNewSearch(urlTextSearchParam);
    }
  }, [init]);

  useEffect(() => {
    console.log('wetriggerreaktiveparams', urlTextSearchParam);

    if (!urlTextSearchParam) {
      setSearchValue('');
      //handleNewSearch(urlTextSearchParam);
    }
  }, [urlTextSearchParam]);

  return (
    <Box component="article" sx={{ marginTop: '2rem' }}>
      <TextField
        fullWidth
        placeholder="Suche starten..."
        variant="outlined"
        value={searchValue || ''}
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
  );
}

export default SearchText;
