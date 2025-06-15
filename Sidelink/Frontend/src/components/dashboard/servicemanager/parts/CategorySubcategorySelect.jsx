import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { categoriesConfiguration } from 'src/config/CategoriesConfigurations';
import CustomAutocomplete from 'src/components/shared/forms/CustomAutocomplete';

const CategorySubcategorySelect = ({ control, setValue, clearErrors, initCategory = null, initSubCategories = [] }) => {
  const publicServices = useSelector(state => state.publicServices.publicServices);
  const categories = categoriesConfiguration.map(category => category.name);
  const [subCategories, setSubCategories] = useState([]);

  const resetSubCategoriesInput = () => {
    setValue('sub_categories', []);
    clearErrors('sub_categories');
  };

  /*
   * If category is selected, subcategories are set to new values, if some values exists in input-field we reset it
   * If no category is selected (newValue is empty), we reset the category and subcategories
   */
  const handleSelectedCategory = newValue => {
    if (!newValue) {
      setSubCategories([]);
      resetSubCategoriesInput();
      return;
    }
    const category = categoriesConfiguration.find(cat => cat.name === newValue);
    if (category) {
      setSubCategories(category.subcategories);
      resetSubCategoriesInput();
    }
  };

  /*
   * If usage is to edit service, category and subcategories set to initvalues
   */
  useEffect(() => {
    if (initCategory != null && subCategories.length === 0) {
      const category = categoriesConfiguration.find(cat => cat.name === initCategory);
      if (category) {
        setValue('category', initCategory);
        setSubCategories(category.subcategories);
        const validInitSubCategories = initSubCategories.filter(subCategory => category.subcategories.includes(subCategory));
        setValue('sub_categories', validInitSubCategories);
      }
    }
  }, [initCategory, initSubCategories, setValue, subCategories.length]);

  /*
   * If new service is created we reset the category and subcategories
   * If usage is in edit mode we do not reset
   */
  useEffect(() => {
    if (publicServices.success && initCategory === null) {
      setValue('category', null);
      setSubCategories([]);
      resetSubCategoriesInput();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicServices.success]);

  return (
    <>
      <Grid size={{ xs: 12, xl: 6 }}>
        <Controller
          name="category"
          control={control}
          render={({ field, fieldState }) => (
            <CustomAutocomplete
              label="Kategorie"
              name={field.name}
              value={field.value}
              onChange={newValue => {
                field.onChange(newValue);
                handleSelectedCategory(newValue);
              }}
              options={categories}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, xl: 6 }}>
        <Controller
          name="sub_categories"
          control={control}
          render={({ field, fieldState }) => (
            <CustomAutocomplete
              multiple
              label="Sub Kategorie"
              name={field.name}
              value={field.value ?? []}
              onChange={field.onChange}
              options={subCategories}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
    </>
  );
};

export default CategorySubcategorySelect;
