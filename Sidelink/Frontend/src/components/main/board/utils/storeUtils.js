function isAnyMaskFilterActive(searchMask) {
  if (!searchMask) return false;

  const hasCategory = !!searchMask.category?.data && searchMask.category.data !== '';
  const hasSubCategories = Array.isArray(searchMask.subCategories?.data) && searchMask.subCategories.data.length > 0;
  const hasRegion = !!searchMask.region?.data && searchMask.region.data !== '';
  const hasServiceType = !!searchMask.serviceType?.data && searchMask.serviceType.data !== '';

  return hasCategory || hasSubCategories || hasRegion || hasServiceType;
}

function checkActiveMaskFilters(searchMask) {
  const activeFilters = [];
  if (searchMask?.category?.data && searchMask.category.data !== '') {
    activeFilters.push({ type: 'category', value: searchMask.category.data });
  }
  if (Array.isArray(searchMask?.subCategories?.data) && searchMask.subCategories.data.length > 0) {
    activeFilters.push({ type: 'subCategories', value: searchMask.subCategories.data });
  }
  if (searchMask?.region?.data && searchMask.region.data !== '') {
    activeFilters.push({ type: 'region', value: searchMask.region.data });
  }
  if (searchMask?.serviceType?.data && searchMask.serviceType.data !== '') {
    activeFilters.push({ type: 'type', value: searchMask.serviceType.data });
  }
  return activeFilters;
}

export { isAnyMaskFilterActive, checkActiveMaskFilters };
