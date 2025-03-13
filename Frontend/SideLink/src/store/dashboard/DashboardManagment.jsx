import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebar: true,
  themeMode: 'light',
};

export const DashboardManagment = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.sidebar = !state.sidebar;
    },
    toggleThemeMode: (state, action) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleSidebar, toggleThemeMode } = DashboardManagment.actions;

export default DashboardManagment.reducer;
