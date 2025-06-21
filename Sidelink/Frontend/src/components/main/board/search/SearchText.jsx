import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { useTheme, useMediaQuery, IconButton, TextField, InputAdornment } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IconX } from '@tabler/icons-react';
import { filterServicesBySearch, filterServicesByActiveMaskFilters } from 'src/components/main/board/utils/searchUtils';
import { isAnyMaskFilterActive, checkActiveMaskFilters } from 'src/components/main/board/utils/storeUtils';
import { useGetUrlParamReaktiv, useUpdateUrlParams } from 'src/components/main/board/hooks/UrlHooks';
import { setSearchEngineData } from 'src/store/publicdata/PublicDataManagment';

function SearchText() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'));
  const [searchValue, setSearchValue] = useState('');
  const { publicServices, searchMask, init } = useSelector(state => state.publicData.publicData);
  const updateUrlParams = useUpdateUrlParams();
  const urlTextSearchParam = useGetUrlParamReaktiv('search');

  /*
   * New search starts after 300ms break
   * If searchmask is active we filter services by active mask filters otherwise we filter services by search value
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
    dispatch(setSearchEngineData(newSerachEngineData));
  }, 300);

  /*
   * If search value is null we load publicservices upon searchmask or load all public services
   */
  const handleNewSearch = newSearchValue => {
    setSearchValue(newSearchValue);
    if (newSearchValue == '' || newSearchValue == null) {
      updateUrlParams(['search'], []);
      handleNewSearchValue.cancel();
      if (isAnyMaskFilterActive(searchMask)) {
        const activeFilters = checkActiveMaskFilters(searchMask);
        let newSerachEngineData = filterServicesByActiveMaskFilters(publicServices, activeFilters);
        dispatch(setSearchEngineData(newSerachEngineData));
      } else {
        dispatch(setSearchEngineData(publicServices));
      }
    } else {
      updateUrlParams([], [{ name: 'search', value: newSearchValue }]);
      handleNewSearchValue(newSearchValue);
    }
  };

  /*
   * If we load page initially we set search results upon url params
   */
  useEffect(() => {
    if (!init && urlTextSearchParam) {
      setSearchValue(urlTextSearchParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init]);

  /*
   * If new filter from application is set we set search value to empty string
   */
  useEffect(() => {
    if (!urlTextSearchParam) {
      setSearchValue('');
    }
  }, [urlTextSearchParam]);

  return (
    <TextField
      component="form"
      fullWidth
      placeholder="Suche starten..."
      variant="outlined"
      value={searchValue || ''}
      onChange={event => {
        handleNewSearch(event.target.value);
      }}
      sx={{
        borderRadius: '8px',
        marginTop: '1rem',
        marginBottom: '2rem',
        '& .MuiInputBase-input': {
          color: theme.palette.text.dark,
          fontSize: mdDown ? '1.2rem' : '1.5rem',
          fontWeight: '500',
        },
        '& .MuiInputBase-root': {
          backgroundColor: theme.palette.background.lightgrey,
        },
      }}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => handleNewSearch('')}>
                <IconX size={mdDown ? '26' : '36'} color="black" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default SearchText;
