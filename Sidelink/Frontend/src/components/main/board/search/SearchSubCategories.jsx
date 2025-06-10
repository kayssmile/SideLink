import { useEffect, useState, useRef } from 'react';
import Grid from '@mui/material/Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { filterServicesBySubCategories, filterServicesByActiveMaskFilters } from 'src/components/main/board/utils/SearchUtils';
import { setSearchEngineData, setSearchMask } from 'src/store/publicdata/PublicDataManagment';
import { isAnyMaskFilterActive, checkActiveMaskFilters } from 'src/components/main/board/utils/StoreUtils';
import { useGetUrlParam, useUpdateUrlParams } from 'src/components/main/board/hooks/UrlHooks';
import CustomAutocomplete from 'src/components/shared/forms/CustomAutocomplete';

function SearchSubCategories({ subCategories }) {
  const dispatch = useDispatch();
  const { publicServices, searchMask } = useSelector(state => state.publicData.publicData);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const urlSubCategoriesParam = useGetUrlParam('subcategories');
  const updateUrlParams = useUpdateUrlParams();
  const initURL = useRef(true);

  const handleSelectedSubCategory = newSubCategories => {
    setSelectedSubCategories(newSubCategories);
    let newSerachEngineData = [];
    if (newSubCategories.length === 0) {
      updateUrlParams(['subcategories', 'search']);
      dispatch(setSearchMask({ type: 'subCategories', data: false }));
      if (isAnyMaskFilterActive({ ...searchMask, subCategories: { data: false } })) {
        const activeFilters = checkActiveMaskFilters({ ...searchMask, subCategories: { data: false } });
        newSerachEngineData = filterServicesByActiveMaskFilters(publicServices, activeFilters);
        dispatch(setSearchEngineData(newSerachEngineData));
      } else {
        dispatch(setSearchEngineData(publicServices));
      }
    } else {
      if (isAnyMaskFilterActive(searchMask)) {
        const activeFilters = checkActiveMaskFilters({ ...searchMask, subCategories: { data: newSubCategories } });
        newSerachEngineData = filterServicesByActiveMaskFilters(publicServices, activeFilters);
      } else {
        newSerachEngineData = filterServicesBySubCategories(publicServices, newSubCategories);
      }
      dispatch(setSearchMask({ type: 'subCategories', data: newSubCategories }));
      dispatch(setSearchEngineData(newSerachEngineData));
      updateUrlParams(['search'], [{ name: 'subcategories', value: newSubCategories }]);
    }
  };

  /*
   * Initialise search type from url, if data is available
   */
  useEffect(() => {
    setSelectedSubCategories([]);
    if (subCategories.length != 0 && urlSubCategoriesParam && initURL.current) {
      const urlParamsArray = urlSubCategoriesParam.split(',');
      setSelectedSubCategories(urlParamsArray);
      initURL.current = false;
    }
  }, [subCategories]);

  return (
    <Grid size={{ xs: 12, xl: 6 }}>
      <CustomAutocomplete name="sub_categories" label="Sub Kategorie" value={selectedSubCategories} options={subCategories} onChange={handleSelectedSubCategory} multiple />
    </Grid>
  );
}

export default SearchSubCategories;
