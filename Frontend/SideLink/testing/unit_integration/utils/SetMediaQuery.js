/*
 * To test with different screen sizes, we override matchMedia.
 * MUI libary uses matchMedia to determine the screen size.
 */
function setMediaQuery(matches) {
  const originalMatchMedia = window.matchMedia;
  window.matchMedia = query => ({
    matches,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
  return () => {
    window.matchMedia = originalMatchMedia;
  };
}

export default setMediaQuery;
