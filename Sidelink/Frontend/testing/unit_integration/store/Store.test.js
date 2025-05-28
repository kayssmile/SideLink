/*
import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '../../src/store/usermanagment/AccountManagment';
import dashboardReducer from '../../src/store/dashboard/DashboardManagment.jsx';

describe('Redux Store Integration', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: accountReducer,
        dashboard: dashboardReducer,
      },
    });
  });

  it('should initialize with correct initial states', () => {
    const state = store.getState();
    expect(state.user).toEqual({
      isAuthenticated: false,
      userData: null,
      loading: false,
      error: null,
    });
    expect(state.dashboard).toEqual({
      data: null,
      loading: false,
      error: null,
    });
  });

  it('should handle login flow correctly', () => {
    // Dispatch login actions
    store.dispatch({ type: 'user/loginRequest' });
    expect(store.getState().user.loading).toBe(true);

    const mockUser = { id: 1, name: 'Test User' };
    store.dispatch({ type: 'user/loginSuccess', payload: mockUser });
    expect(store.getState().user).toEqual({
      isAuthenticated: true,
      userData: mockUser,
      loading: false,
      error: null,
    });
  });

  it('should handle dashboard data fetching flow', () => {
    // Dispatch dashboard actions
    store.dispatch({ type: 'dashboard/fetchDashboardRequest' });
    expect(store.getState().dashboard.loading).toBe(true);

    const mockData = { stats: { users: 10 } };
    store.dispatch({ type: 'dashboard/fetchDashboardSuccess', payload: mockData });
    expect(store.getState().dashboard).toEqual({
      data: mockData,
      loading: false,
      error: null,
    });
  });
}); */
