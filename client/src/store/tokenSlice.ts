import { createSlice } from '@reduxjs/toolkit';

type TokenTypes = {
  sessToken: string;
  tokenExpires: number;
  refreshToken: string;
  timeStamp: number;
};

const initialState = {
  sessToken: '',
  tokenExpires: 0,
  refreshToken: '',
  timeStamp: 0,
} as TokenTypes;

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setSessToken(state, { payload }) {
      state.sessToken = payload;
    },
    setTokenExpires(state, { payload }) {
      state.tokenExpires = payload;
    },
    setRefreshToken(state, { payload }) {
      state.refreshToken = payload;
    },
    setTimeStamp(state, { payload }) {
      state.timeStamp = payload;
    },
  },
});

export const {
  setSessToken,
  setTokenExpires,
  setRefreshToken,
  setTimeStamp,
} = tokenSlice.actions;

export default tokenSlice.reducer;
