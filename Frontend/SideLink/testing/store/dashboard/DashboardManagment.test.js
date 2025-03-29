/*
import reducer, { fetchDashboardRequest, fetchDashboardSuccess, fetchDashboardFailure } from '../../../src/store/dashboard/DashboardManagment';

describe('Dashboard Management Reducer', () => {
  const initialState = {
    data: null,
    loading: false,
    error: null,
  };

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_DASHBOARD_REQUEST', () => {
    expect(reducer(initialState, fetchDashboardRequest())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle FETCH_DASHBOARD_SUCCESS', () => {
    const mockData = { stats: { users: 10, offers: 5 } };
    expect(reducer(initialState, fetchDashboardSuccess(mockData))).toEqual({
      data: mockData,
      loading: false,
      error: null,
    });
  });

  it('should handle FETCH_DASHBOARD_FAILURE', () => {
    const error = 'Network error';
    expect(reducer(initialState, fetchDashboardFailure(error))).toEqual({
      ...initialState,
      error,
      loading: false,
    });
  });
});

describe('Dashboard Management Actions', () => {
  it('should create fetchDashboardRequest action', () => {
    expect(fetchDashboardRequest()).toEqual({
      type: 'dashboard/fetchDashboardRequest',
    });
  });

  it('should create fetchDashboardSuccess action with payload', () => {
    const data = { stats: { users: 10 } };
    expect(fetchDashboardSuccess(data)).toEqual({
      type: 'dashboard/fetchDashboardSuccess',
      payload: data,
    });
  });

  it('should create fetchDashboardFailure action with error', () => {
    const error = 'Error';
    expect(fetchDashboardFailure(error)).toEqual({
      type: 'dashboard/fetchDashboardFailure',
      payload: error,
    });
  });
}); */
