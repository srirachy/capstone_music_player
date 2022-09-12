import { createSlice } from '@reduxjs/toolkit';
// import type { RootState } from './index'; DEV-PLACEHOLDER

type TokenTypes = {
  sessToken: string;
};

const initialState = {
  sessToken: '',
} as TokenTypes;

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setSessToken(state, { payload }) {
      state.sessToken = payload;
    },
  },
});

// export const tokenState = (state: RootState) => state; DEV-PLACEHOLDER
export const { setSessToken } = tokenSlice.actions;

export default tokenSlice.reducer;
