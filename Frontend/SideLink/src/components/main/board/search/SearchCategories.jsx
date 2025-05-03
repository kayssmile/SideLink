import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useDispatch, useSelector } from 'react-redux';

import { categoriesConfiguration } from 'src/config/CategoriesConfigurations';
import { filterServicesByCategory, filterServicesByActiveMaskFilters } from 'src/components/main/board/utils/searchUtils';
import { setSearchEngineData, setSearchMask } from 'src/store/publicdata/PublicDataManagment';
import { isAnyMaskFilterActive, checkActiveMaskFilters } from 'src/components/main/board/utils/storeUtils';

import CustomAutocomplete from 'src/components/shared/forms/CustomAutocomplete';
import SearchSubCategories from './SearchSubCategories';
import { useGetUrlParam, useAddUrlParam, useRemoveUrlParams } from 'src/components/main/board/hooks/UrlHooks';

function SearchCategories() {
  const dispatch = useDispatch();
  const { publicServices, searchMask, searchEngineData, success, init } = useSelector(state => state.publicdata.publicData);
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const categories = categoriesConfiguration.map(category => category.name);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);

  const setUrlParam = useAddUrlParam();
  const removeUrlParams = useRemoveUrlParams();
  const urlCategoryParam = useGetUrlParam('category');

  const handleNewCategory = newCategory => {
    const category = categoriesConfiguration.find(cat => cat.name === newCategory);
    if (category) {
      setSelectedCategory(category.name);
      setSubCategories(category.subcategories);
    }
  };

  const handleSelectedCategory = selectedCategory => {
    setSubCategories([]);
    dispatch(setSearchMask({ type: 'subCategories', data: false }));
    handleNewCategory(selectedCategory);
    let newSerachEngineData = [];

    if (selectedCategory === null) {
      setSelectedCategory('');
      removeUrlParams(['category', 'subcategories', 'search']);
      dispatch(setSearchMask({ type: 'category', data: false }));
      if (isAnyMaskFilterActive({ ...searchMask, category: { data: false }, subCategories: { data: false } })) {
        const activeFilters = checkActiveMaskFilters({ ...searchMask, category: { data: false }, subCategories: { data: false } });
        newSerachEngineData = filterServicesByActiveMaskFilters(publicServices, activeFilters);
        dispatch(setSearchEngineData(newSerachEngineData));
      } else {
        dispatch(setSearchEngineData(publicServices));
      }
    } else {
      if (isAnyMaskFilterActive({ ...searchMask, category: { data: false }, subCategories: { data: false } })) {
        const activeFilters = checkActiveMaskFilters({ ...searchMask, category: { data: selectedCategory }, subCategories: { data: false } });
        newSerachEngineData = filterServicesByActiveMaskFilters(publicServices, activeFilters);
      } else {
        newSerachEngineData = filterServicesByCategory(publicServices, selectedCategory);
      }
      removeUrlParams(['subcategories', 'search']);
      setUrlParam('category', selectedCategory);
      dispatch(setSearchMask({ type: 'category', data: selectedCategory }));

      dispatch(setSearchEngineData(newSerachEngineData));
    }
  };

  /*
   * Initialise search type from url, if data is available
   */
  useEffect(() => {
    if (urlCategoryParam) {
      handleNewCategory(urlCategoryParam);
    }
  }, []);

  return (
    <>
      <Grid size={{ xs: 12, xl: 6 }}>
        <CustomAutocomplete name="category" label="Kategorie" value={selectedCategory} options={categories} onChange={handleSelectedCategory} />
      </Grid>
      <SearchSubCategories subCategories={subCategories} />
    </>
  );
}

export default SearchCategories;
