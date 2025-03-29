import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

//import DashboardManagment from './dashboard/DashboardManagment';
import userManagmentReducer from 'src/store/usermanagment/UserManagment';

export default function renderWithRedux(ui, { preloadedState } = {}) {
  const store = configureStore({ reducer: { userManagment: userManagmentReducer }, preloadedState });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}
