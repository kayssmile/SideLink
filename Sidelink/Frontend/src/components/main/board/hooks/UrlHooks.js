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
  }, [search, paramName]);
}

function useUpdateUrlParams() {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  return (paramsToRemove = [], paramsToAdd = []) => {
    const currentParams = new URLSearchParams(search);
    paramsToRemove.forEach(paramName => {
      currentParams.delete(paramName);
    });
    paramsToAdd.forEach(({ name, value }) => {
      if (value !== undefined && value !== null) {
        currentParams.set(name, value);
      } else {
        currentParams.delete(name);
      }
    });
    navigate(`${pathname}?${currentParams.toString()}`, { replace: true });
  };
}

export { useGetUrlParam, useGetUrlParamReaktiv, useUpdateUrlParams };
