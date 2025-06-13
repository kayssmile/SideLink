import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { isAnyMaskFilterActive, checkActiveMaskFilters } from 'src/components/main/board/utils/storeUtils';
import regionsConfiguration from 'src/config/LocationConfigurations';
import { filterServicesByRegion, filterServicesByActiveMaskFilters } from 'src/components/main/board/utils/searchUtils';
import { setSearchEngineData, setSearchMask } from 'src/store/publicdata/PublicDataManagment';
import { useGetUrlParam, useUpdateUrlParams } from 'src/components/main/board/hooks/UrlHooks';
import CustomAutocomplete from 'src/components/shared/forms/CustomAutocomplete';

function SearchRegion() {
  const dispatch = useDispatch();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const { publicServices, searchMask, success } = useSelector(state => state.publicData.publicData);
  const urlTypeParam = useGetUrlParam('region');
  const updateUrlParams = useUpdateUrlParams();
  const regions = regionsConfiguration.map(region => region.name);

  const handleSelectedRegion = selectedRegion => {
    setSelectedRegion(selectedRegion);
    let newSerachEngineData = [];
    if (selectedRegion === null) {
      updateUrlParams(['region', 'search']);
      dispatch(setSearchMask({ type: 'region', data: false }));
      if (isAnyMaskFilterActive({ ...searchMask, region: { data: false } })) {
        const activeFilters = checkActiveMaskFilters({ ...searchMask, region: { data: false } });
        newSerachEngineData = filterServicesByActiveMaskFilters(publicServices, activeFilters);
        dispatch(setSearchEngineData(newSerachEngineData));
      } else {
        newSerachEngineData = publicServices;
        dispatch(setSearchEngineData(newSerachEngineData));
      }
    } else {
      if (isAnyMaskFilterActive(searchMask)) {
        const activeFilters = checkActiveMaskFilters({ ...searchMask, region: { data: selectedRegion } });
        newSerachEngineData = filterServicesByActiveMaskFilters(publicServices, activeFilters);
      } else {
        newSerachEngineData = filterServicesByRegion(publicServices, selectedRegion);
      }
      dispatch(setSearchMask({ type: 'region', data: selectedRegion }));
      dispatch(setSearchEngineData(newSerachEngineData));
      updateUrlParams(['search'], [{ name: 'region', value: selectedRegion }]);
    }
  };

  /*
   * Initialise search region from url, if data is available
   */
  useEffect(() => {
    if (urlTypeParam) {
      setSelectedRegion(urlTypeParam);
    }
  }, [success]);

  return (
    <Grid size={{ xs: 12, xl: 6 }}>
      <CustomAutocomplete name="region" label="Region / Kanton" value={selectedRegion} options={regions} onChange={handleSelectedRegion} />
    </Grid>
  );
}

export default SearchRegion;
