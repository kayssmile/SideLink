import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

function useGetUrlParam(paramName) {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return params.get(paramName);
}

function useGetUrlParamReaktiv(paramName) {
  const { search } = useLocation();

  return useMemo(() => {
    const params = new URLSearchParams(search);
    return params.get(paramName);
  }, [search, paramName]); // <--- wichtig
}

function useAddUrlParam() {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  return (paramName, paramValue) => {
    const params = new URLSearchParams(search);
    params.set(paramName, paramValue);
    //navigate(`${pathname}?${params.toString()}`, { replace: true });
    navigate(`${window.location.pathname}?${params.toString()}`, { replace: true });
  };
}

function useRemoveUrlParams() {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  return paramNames => {
    const currentParams = new URLSearchParams(search);
    paramNames.forEach(paramName => {
      currentParams.delete(paramName);
    });
    //console.log('currentParams', currentParams);
    //navigate(`${pathname}?${currentParams.toString()}`, { replace: true });
    navigate(`${window.location.pathname}?${currentParams.toString()}`, { replace: true });
  };
}

export { useGetUrlParam, useAddUrlParam, useRemoveUrlParams, useGetUrlParamReaktiv };
