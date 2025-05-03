import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { useSelector } from 'react-redux';

import { categoriesConfiguration } from 'src/config/CategoriesConfigurations';

import CustomAutocomplete from 'src/components/shared/forms/CustomAutocomplete';

const CategorySubcategorySelect = ({ register, setValue, clearErrors, errors, initCategory = null, initSubCategories = [] }) => {
  const publicServices = useSelector(state => state.publicservices.publicServices);
  const categories = categoriesConfiguration.map(category => category.name);
  const [selectedCategory, setSelectedCategory] = useState(initCategory);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState(initSubCategories);

  /*
   * If we use component to edit data we set the initial values
   */
  if (initCategory != null && subCategories.length === 0) {
    const category = categoriesConfiguration.find(cat => cat.name === initCategory);
    if (category) {
      setValue('category', initCategory);
      setSubCategories(category.subcategories);
    }
    const validInitSubCategories = initSubCategories.filter(subCategory => category.subcategories.includes(subCategory));
    setValue('sub_categories', validInitSubCategories);
  }

  const resetSubCategoriesInput = () => {
    setSelectedSubCategories([]);
    setValue('sub_categories', []);
    clearErrors('sub_categories');
  };

  /*
   * If category is selected, subcategories are set to new values, if some values exists in input-field we reset it
   * If no category is selected (newValue is empty), we reset the category and subcategories
   */
  const handleSelectedCategory = newValue => {
    if (!newValue) {
      setSelectedCategory(null);
      setSubCategories([]);
      resetSubCategoriesInput();
      return;
    }
    setSelectedCategory(newValue);
    const category = categoriesConfiguration.find(cat => cat.name === newValue);
    if (category) {
      setSubCategories(category.subcategories);
      resetSubCategoriesInput();
    }
  };

  /*
   * If new subcategory is selected, we set subcategories to new value (because mui had problem to update value with multiple option we set value manual)
   * If newValue is empty, we reset the subcategories
   */
  const handleSelectedSubCategory = newValue => {
    if (!newValue) {
      setSelectedSubCategories([]);
      return;
    }
    setValue('sub_categories', newValue);
    setSelectedSubCategories(newValue);
  };

  /*
   * If new service is created we reset the category and subcategories
   * If usage is in edit mode we do not reset
   */
  useEffect(() => {
    if (publicServices.success && initCategory === null) {
      setSelectedCategory(null);
      setSubCategories([]);
      resetSubCategoriesInput();
    }
  }, [publicServices.success]);

  return (
    <>
      <Grid size={{ xs: 12, xl: 6 }}>
        <CustomAutocomplete
          name="category"
          label="Kategorie"
          value={selectedCategory}
          options={categories}
          onChange={handleSelectedCategory}
          error={errors.category}
          helperText={errors.category?.message}
          register={register('category')}
        />
      </Grid>

      <Grid size={{ xs: 12, xl: 6 }}>
        <CustomAutocomplete
          name="sub_categories"
          label="Sub Kategorie"
          value={selectedSubCategories}
          options={subCategories}
          onChange={handleSelectedSubCategory}
          error={errors.sub_categories}
          helperText={errors.sub_categories?.message}
          multiple
        />
      </Grid>
    </>
  );
};

export default CategorySubcategorySelect;
