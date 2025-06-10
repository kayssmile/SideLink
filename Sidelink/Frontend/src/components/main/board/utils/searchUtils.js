function filterServicesBySearch(publicServices, keyword) {
  let result = [];

  publicServices.forEach(publicService => {
    let shouldAdd = false;
    for (const [key, value] of Object.entries(publicService)) {
      if (shouldAdd) break;
      if (typeof value === 'string') {
        if (value.toLowerCase().includes(keyword.toLowerCase())) {
          shouldAdd = true;
          break;
        }
      }
      if (key === 'sub_categories_details' && Array.isArray(value)) {
        for (const sub_category of value) {
          if (typeof sub_category.name === 'string' && sub_category.name.toLowerCase().includes(keyword.toLowerCase())) {
            shouldAdd = true;
            break;
          }
        }
      }
    }
    if (shouldAdd) {
      result.push(publicService);
    }
  });
  return result;
}

function filterServicesByCategory(publicServices, category) {
  let result = [];
  publicServices.forEach(publicService => {
    if (publicService.category_details === category) {
      result.push(publicService);
    }
  });
  return result;
}

function filterServicesBySubCategories(publicServices, subCategories) {
  let result = [];
  publicServices.forEach(publicService => {
    subCategories.forEach(subCategory_filter => {
      for (const sub_category of publicService.sub_categories_details) {
        if (sub_category.name === subCategory_filter) {
          result.push(publicService);
          break;
        }
      }
    });
  });
  return result;
}

function filterServicesByRegion(publicServices, region) {
  let result = [];
  publicServices.forEach(publicService => {
    if (publicService.region_details === region) {
      result.push(publicService);
    }
  });
  return result;
}

function filterServicesByType(publicServices, type) {
  let result = [];
  publicServices.forEach(publicService => {
    if (publicService.service_type === type) {
      result.push(publicService);
    }
  });
  return result;
}

function filterServicesByActiveMaskFilters(publicServices, activeFilters) {
  let result = [];
  let isAnyFilterActive = false;
  let categoryFilter = activeFilters.find(filter => filter.type === 'category');
  let subCategoryFilter = activeFilters.find(filter => filter.type === 'subCategories');
  let regionFilter = activeFilters.find(filter => filter.type === 'region');
  let serviceTypeFilter = activeFilters.find(filter => filter.type === 'type');

  /*
   * Check if category filter is active, if true we filter services by category
   */
  if (categoryFilter) {
    publicServices.forEach(publicService => {
      if (publicService.category_details === categoryFilter.value) {
        result.push(publicService);
      }
    });
    isAnyFilterActive = true;
  }

  /*
   * Check if sub_categories filter is active,
   * if other filter is active we filter services by sub_categries upon the result of the previous filters
   */
  if (subCategoryFilter) {
    if (isAnyFilterActive) {
      result = result.filter(publicService => {
        let matches = false;
        publicService.sub_categories_details.forEach(subCategory => {
          for (const subCategoryFilterName of subCategoryFilter.value) {
            if (subCategoryFilterName === subCategory.name) {
              matches = true;
              break;
            }
          }
        });
        return matches;
      });
    } else {
      publicServices.forEach(publicService => {
        publicService.sub_categories_details.forEach(subCategory => {
          for (const subCategoryFilterName of subCategoryFilter.value) {
            if (subCategoryFilterName === subCategory.name) {
              result.push(publicService);
              break;
            }
          }
        });
      });
      isAnyFilterActive = true;
    }
  }

  /*
   * Check if region filter is active, if other filters are active we filter services by region upon the result of the previous filters
   */
  if (regionFilter) {
    if (isAnyFilterActive) {
      result = result.filter(publicService => publicService.region_details === regionFilter.value);
    } else {
      publicServices.forEach(publicService => {
        if (publicService.region_details === regionFilter.value) {
          result.push(publicService);
        }
      });
      isAnyFilterActive = true;
    }
  }

  /*
   * Check if service-type filter is active, if other filters are active we filter services by service-type upon the result of the previous filters
   */
  if (serviceTypeFilter) {
    if (isAnyFilterActive) {
      result = result.filter(publicService => publicService.service_type === serviceTypeFilter.value);
    } else {
      publicServices.forEach(publicService => {
        if (publicService.service_type === serviceTypeFilter.value) {
          result.push(publicService);
        }
      });
    }
  }

  return result;
}

export { filterServicesBySearch, filterServicesByCategory, filterServicesBySubCategories, filterServicesByRegion, filterServicesByType, filterServicesByActiveMaskFilters };
