/*
import reducer, { loginRequest, loginSuccess, loginFailure, logout } from '../../../src/store/usermanagment/AccountManagment';

describe('User Management Reducer', () => {
  const initialState = {
    isAuthenticated: false,
    userData: null,
    loading: false,
    error: null,
  };

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(reducer(initialState, loginRequest())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    const mockUser = { id: 1, name: 'Test User' };
    expect(reducer(initialState, loginSuccess(mockUser))).toEqual({
      isAuthenticated: true,
      userData: mockUser,
      loading: false,
      error: null,
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    const error = 'Invalid credentials';
    expect(reducer(initialState, loginFailure(error))).toEqual({
      ...initialState,
      error,
      loading: false,
    });
  });

  it('should handle LOGOUT', () => {
    const state = {
      isAuthenticated: true,
      userData: { id: 1, name: 'Test User' },
      loading: false,
      error: null,
    };
    expect(reducer(state, logout())).toEqual(initialState);
  });
});

describe('User Management Actions', () => {
  it('should create loginRequest action', () => {
    expect(loginRequest()).toEqual({
      type: 'user/loginRequest',
    });
  });

  it('should create loginSuccess action with payload', () => {
    const user = { id: 1, name: 'Test' };
    expect(loginSuccess(user)).toEqual({
      type: 'user/loginSuccess',
      payload: user,
    });
  });

  it('should create loginFailure action with error', () => {
    const error = 'Error';
    expect(loginFailure(error)).toEqual({
      type: 'user/loginFailure',
      payload: error,
    });
  });

  it('should create logout action', () => {
    expect(logout()).toEqual({
      type: 'user/logout',
    });
  });
});
*/
