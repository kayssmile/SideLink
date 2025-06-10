import { useState, useEffect } from 'react';
import { MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { isAnyMaskFilterActive, checkActiveMaskFilters } from 'src/components/main/board/utils/StoreUtils';
import { filterServicesByType, filterServicesByActiveMaskFilters } from 'src/components/main/board/utils/SearchUtils';
import { setSearchEngineData, setSearchMask } from 'src/store/publicdata/PublicDataManagment';
import { useGetUrlParam, useUpdateUrlParams } from 'src/components/main/board/hooks/UrlHooks';
import { StyledFormLabel } from 'src/components/shared/forms/FormElements';

function SearchType() {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState('');
  const { publicServices, searchMask, loading, error, success, init } = useSelector(state => state.publicData.publicData);
  const urlTypeParam = useGetUrlParam('type');
  const updateUrlParams = useUpdateUrlParams();

  const handleSelectedType = selectedType => {
    setSelectedType(selectedType);
    let newSearchEngineData = [];
    if (selectedType === '') {
      updateUrlParams(['type', 'search']);
      dispatch(setSearchMask({ type: 'type', data: false }));
      if (isAnyMaskFilterActive({ ...searchMask, serviceType: { data: false } })) {
        const activeFilters = checkActiveMaskFilters({ ...searchMask, serviceType: { data: false } });
        newSearchEngineData = filterServicesByActiveMaskFilters(publicServices, activeFilters);
        dispatch(setSearchEngineData(newSearchEngineData));
      } else {
        newSearchEngineData = publicServices;
        dispatch(setSearchEngineData(newSearchEngineData));
      }
    } else {
      if (isAnyMaskFilterActive(searchMask)) {
        const activeFilters = checkActiveMaskFilters({ ...searchMask, serviceType: { data: selectedType } });
        newSearchEngineData = filterServicesByActiveMaskFilters(publicServices, activeFilters);
      } else {
        newSearchEngineData = filterServicesByType(publicServices, selectedType);
      }
      dispatch(setSearchMask({ type: 'type', data: selectedType }));
      dispatch(setSearchEngineData(newSearchEngineData));
      updateUrlParams(['search'], [{ name: 'type', value: selectedType }]);
    }
  };

  /*
   * Initialise search type from url, if data is available
   */
  useEffect(() => {
    if (urlTypeParam) {
      setSelectedType(urlTypeParam);
    }
  }, []);

  return (
    <Grid size={{ xs: 12, xl: 6 }}>
      <StyledFormLabel id="service-type-label" sx={{ mt: 0 }}>
        Angebotstyp
      </StyledFormLabel>
      <Select
        displayEmpty
        labelId="service-type-label"
        id="service-type"
        value={selectedType}
        onChange={event => handleSelectedType(event.target.value)}
        sx={{
          width: '100%',
          color: '#7C8FAC',
          '& .MuiSelect-icon': {
            color: 'white',
            fontSize: '2rem',
            width: '2rem',
            height: '2rem',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#7C8FAC',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5D87FF',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5D87FF',
          },
          '&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5D87FF',
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: 'white',
              color: 'black',
            },
          },
        }}
      >
        <MenuItem value="">Auswahl Suche/Angebot</MenuItem>
        <MenuItem value={'offer'}>Angebote</MenuItem>
        <MenuItem value={'search'}>Suche</MenuItem>
      </Select>
    </Grid>
  );
}

export default SearchType;
