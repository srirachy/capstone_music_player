import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TokenTypes } from '../types';

const initialState = {
  loading: false,
  error: false,
  sessToken: '',
  tokenExpires: 0,
  refreshToken: '',
  timeStamp: 0,
  refreshData: {},
} as TokenTypes;

export const fetchRefreshToken = createAsyncThunk(
  'token/fetchRefreshToken',
  async (refreshToken: string) => {
    const rTok = refreshToken;
    const res = await fetch(`/auth/refresh_token/${rTok}`);
    const resData = res.json();
    return resData;
  },
);

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
  extraReducers(builder) {
    builder
      .addCase(fetchRefreshToken.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchRefreshToken.fulfilled, (state, { payload }) => {
        state.error = false;
        state.loading = false;
        state.refreshData = payload;
      })
      .addCase(fetchRefreshToken.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const {
  setSessToken,
  setTokenExpires,
  setRefreshToken,
  setTimeStamp,
} = tokenSlice.actions;

export default tokenSlice.reducer;
