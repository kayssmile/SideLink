const getUrlParameter = param => {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
};

// Diese Funktion extrahiert alle URL-Parameter und gibt sie als Objekt zurück
const getAllUrlParameters = () => {
  const params = new URLSearchParams(window.location.search);
  const paramsObj = {};

  for (const [key, value] of params.entries()) {
    paramsObj[key] = value;
  }

  return paramsObj;
};

// Diese Funktion konvertiert ein Parameter-Objekt in einen URL-Query-String
const objectToQueryString = paramsObj => {
  const params = new URLSearchParams(paramsObj);
  return params.toString();
};

// Diese Funktion fügt Parameter zur URL hinzu (ohne die Seite neu zu laden)
const addParamsToUrl = (key, value) => {
  const currentParams = new URLSearchParams(window.location.search);
  currentParams.set(key, value);
  // Aktualisiere die URL ohne die Seite zu neu zu laden
  window.history.pushState({}, '', `${window.location.pathname}?${currentParams}`);
  console.log('window history', window.history);
};

// Diese Funktion entfernt einen bestimmten Parameter aus der URL
const removeUrlParameter = param => {
  const currentParams = new URLSearchParams(window.location.search);
  currentParams.delete(param); // Löscht den angegebenen Parameter
  window.history.pushState({}, '', `${window.location.pathname}?${currentParams}`);
};

export { getUrlParameter, getAllUrlParameters, objectToQueryString, addParamsToUrl, removeUrlParameter };
