import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { useDispatch, useSelector } from 'react-redux';

import { filterServicesBySubCategories, filterServicesByActiveMaskFilters } from 'src/components/main/board/utils/searchUtils';
import { setSearchEngineData, setSearchMask } from 'src/store/publicdata/PublicDataManagment';
import { isAnyMaskFilterActive, checkActiveMaskFilters } from 'src/components/main/board/utils/storeUtils';
import { useGetUrlParam, useAddUrlParam, useRemoveUrlParams } from 'src/components/main/board/hooks/UrlHooks';

import CustomAutocomplete from 'src/components/shared/forms/CustomAutocomplete';

function SearchSubCategories({ subCategories }) {
  const dispatch = useDispatch();
  const { publicServices, searchMask, searchEngineData, success } = useSelector(state => state.publicdata.publicData);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const setUrlParam = useAddUrlParam();
  const removeUrlParams = useRemoveUrlParams();
  const urlSubCategoriesParam = useGetUrlParam('subcategories');

  const handleSelectedSubCategory = newSubCategories => {
    setSelectedSubCategories(newSubCategories);
    let newSerachEngineData = [];
    if (newSubCategories.length === 0) {
      removeUrlParams(['subcategories']);
      dispatch(setSearchMask({ type: 'subCategories', data: false }));

      if (isAnyMaskFilterActive({ ...searchMask, subCategories: { data: false } })) {
        const activeFilters = checkActiveMaskFilters({ ...searchMask, subCategories: { data: false } });
        let newSerachEngineData = filterServicesByActiveMaskFilters(publicServices, activeFilters);
        dispatch(setSearchEngineData(newSerachEngineData));
      } else {
        dispatch(setSearchEngineData(publicServices));
      }
    } else {
      if (isAnyMaskFilterActive(searchMask)) {
        newSerachEngineData = filterServicesBySubCategories(searchEngineData, newSubCategories);
      } else {
        newSerachEngineData = filterServicesBySubCategories(publicServices, newSubCategories);
      }

      dispatch(setSearchMask({ type: 'subCategories', data: newSubCategories }));
      dispatch(setSearchEngineData(newSerachEngineData));
      setUrlParam('subcategories', newSubCategories);
    }
  };

  /*
   * Initialise search type from url, if data is available
   */
  useEffect(() => {
    setSelectedSubCategories([]);
    if (subCategories.length != 0 && urlSubCategoriesParam) {
      const urlParamsArray = urlSubCategoriesParam.split(',');
      setSelectedSubCategories(urlParamsArray);
    }
  }, [subCategories]);

  return (
    <>
      <Grid size={{ xs: 12, xl: 6 }}>
        <CustomAutocomplete name="sub_categories" label="Sub Kategorie" value={selectedSubCategories} options={subCategories} onChange={handleSelectedSubCategory} multiple />
      </Grid>
    </>
  );
}

export default SearchSubCategories;
