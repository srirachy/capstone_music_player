import { createSlice } from '@reduxjs/toolkit';
import { ThemeTypes } from '../types';

const initialState = {
  themeState: 'Spotify',
} as ThemeTypes;

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeState(state, { payload }) {
      state.themeState = payload;
    },
  },
});

export const { setThemeState } = themeSlice.actions;
export default themeSlice.reducer;
